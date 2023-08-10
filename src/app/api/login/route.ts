import { comparePasswords } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { createJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (!user) res.status(401).json({});

        const passwordMatch = await comparePasswords(req.body.password, user.password);
        
        if (!passwordMatch) res.status(401).json({});

        const jwt = await createJWT(user);

        res.setHeader("Set-Cookie", serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })
        );
    console.log("Bitches come and go, saturday, sunday, monday, and i know that this shit be going in my head like crazy");
    return res.status(200).json({ buggy: "lor" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({});
    }
}
