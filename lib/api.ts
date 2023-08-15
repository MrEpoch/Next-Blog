'use server';
import { cookies } from "next/headers";
import { comparePasswords, createJWT, hashPassword } from "./auth";
import { db } from "./db";
import { redirect } from "next/navigation";

export async function fetcher({ url, method, body, json = true }) {
    try {
    const res = await fetch(url, {
        method,
        ...(body && {body: JSON.stringify(body)}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    if (!res.ok) {
        throw new Error('API FETCHER ERROR');
    }

    if (json) {
        const data = await res.json();
        console.log(data);
    }
    } catch (error) {
        console.log(error);
    }
}

export const register = async (user: FormData) => {
    let fucking_error_happened = false;
    try {

        const user_create = await db.user.create({
            data: {
                firstName: user.get("firstName") as string,
                lastName: user.get("lastName") as string,
                email: user.get("email") as string,
                password: await hashPassword(user.get("password") as string),
            }
        }); 

        const jwt = await createJWT(user_create);

        cookies().set(
            process.env.COOKIE_NAME,
            jwt,
            {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            }
        );
    } catch (error) {
        console.log(error);
        fucking_error_happened = true;
    }
    if (fucking_error_happened) return redirect("/");
    return redirect("/home");
}

export const login = async (user: FormData) => {
    let fucking_error_happened = false;
    try {
        const user_find = await db.user.findUnique({
            where: {
                email: user.get("email") as string,
            }
        });

        if (!user_find) fucking_error_happened = true;

        const passwordMatch = await comparePasswords(user.get("password") as string, user_find.password);
        
        if (!passwordMatch) fucking_error_happened = true;

        const jwt = await createJWT(user_find);

        cookies().set(
            process.env.COOKIE_NAME,
            jwt,
            {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            }
        );
        
    } catch (e) {
        console.log(e);
        fucking_error_happened = true;
    }
    if (fucking_error_happened) return redirect("/");
    return redirect("/home");
}
