'use client';
import { useRouter } from "next/router";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { signin, register } from "@/lib/api";
import { useCallback, useState } from "react";

const registerContent = {
    linkurl: "/signin",
    linkText: "Already have account?",
    header: "Create a new account",
    subHeader: "Just few things to get started",
    buttonText: "Register"
}

const loginContent = {
    linkurl: "/login",
    linkText: "Don't have account?",
    header: "Welcome back",
    subHeader: "Enter credentials to access your account",
    buttonText: "Login"
}

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "login" }) {
    const router = useRouter();

    const [error, setError] = useState("");
    const [formState, setFormState] = useState({...initial});

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();

        try {

            if (mode === "register") {
                await register(formState);
            } else {
                await signin(formState);
            }
            router.replace("/home");
        } catch (e) {
            setError(`Could not ${mode}`);
        } finally {
            setFormState({...initial});
        }
    }, [formState.email, formState.password, formState.firstName, formstate.lastName, mode, router]);

    return (
        <Card>
        </Card>
    )
}
