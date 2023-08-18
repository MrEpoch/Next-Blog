'use server';
import { cookies } from "next/headers";
import { comparePasswords, createJWT, hashPassword, validateJWT } from "./auth";
import { db } from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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
    await (async () => { 
        try {
        const user_find = await db.user.findUnique({
            where: {
                email: user.get("email") as string,
            }});

        if (!user_find) return fucking_error_happened = true;

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
        return fucking_error_happened = true;
    }
    })();
    if (fucking_error_happened) return redirect("/");
    return redirect("/home");
}

export const create_project = async (data) => {
    let error = false;
    await (async() => {
        try {
        const user = await validateJWT(cookies().get(process.env.COOKIE_NAME)?.value);
        
        if (!user) return error = true;

        await db.project.create({
            data: {
                name: data.get("name"),
                belongsToId: user.id
            }
        });
        
        revalidatePath("/home");
        } catch (e) {
            console.log(e); 
            return error = true;
        }
    })()
    return;
}
