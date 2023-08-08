import { comparePasswords } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { createJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (!user) res.status(401).end();

        const passwordMatch = await comparePasswords(req.body.password, user.password);
        
        if (!passwordMatch) res.status(401).end();

        const jwt = await createJWT(user);

        res.setHeader("Set-Cookie", serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })
        );

    }
}
