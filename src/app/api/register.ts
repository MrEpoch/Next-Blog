import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "POST") {
        const user = await db.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await hashPassword(req.body.password)
            }
        }); 

        const jwt = await createJWT(user);

        res.setHeader("Set-Cookie", serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            })
        );
        return res.status(200).json({});
    } else {
        res.status(402).json({});
    }
}
