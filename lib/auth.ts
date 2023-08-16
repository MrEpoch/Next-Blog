// @ts-ignore
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

export async function hashPassword(password: string): Promise<string> {
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export async function createJWT(user) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({ payload: { id: user.id, email: user.email } })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function validateJWT(jwt) {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload as any;
}

export async function getUserFromCookie(cookies) {
    try {
        const jwt = cookies.get(process.env.COOKIE_NAME);

        const { id } = await validateJWT(jwt.value);

        const user = await db.user.findUnique({
            where: {
                id,
            }
        });

        return user;
    } catch (error) {
        console.log(error);
        return {} as any;
    }
}
