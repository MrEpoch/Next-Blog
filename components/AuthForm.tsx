'use client';
import { useRouter } from "next/router";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { signin, register } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";

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
            router.replace("/home");
        }
    },[
        formState.email,
        formState.password,
        formState.firstName,
        formState.lastName,
    ]);

    const content = mode === "register" ? registerContent : loginContent;

    return (
        <Card>
            <div className="w-full">
                <div className="text-center">
                    <h2 className="text-3xl mb-2">{content.header}</h2>
                    <p className="text-lg text-black/25">{content.subHeader}</p>
                </div>
                <form onSubmit={handleSubmit} className="py-10 w-full">
                    {mode === "register" && (
                        <div className="flex mb-8 justify-between">
                            <div className="pr-2">
                                <div className="text-lg mb-4 ml-2 text-blacl/50">First Name</div>
                                <Input
                                    type="text"
                                    required
                                    className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                    value={formState.firstName}
                                    onChange={(e) => setFormState({...formState, firstName: e.target.value})}
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="pr-2">
                                <div className="text-lg mb-4 ml-2 text-blacl/50">Last Name</div>
                                <Input
                                    type="text"
                                    required
                                    className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                    value={formState.lastName}
                                    onChange={(e) => setFormState({...formState, lastName: e.target.value})}
                                    placeholder="First Name"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-8">
                            <div className="text-lg mb-4 ml-2 text-blacl/50">Email</div>
                            <Input
                                type="email"
                                required
                                className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                placeholder="First Name"
                            />
                    </div>
                    <div className="mb-8">
                            <div className="text-lg mb-4 ml-2 text-blacl/50">Password</div>
                            <Input
                                type="text"
                                required
                                className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                value={formState.password}
                                onChange={(e) => setFormState({...formState, password: e.target.value})}
                                placeholder="First Name"
                            />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <span>
                                <Link
                                    href={content.linkurl}
                                    className="text-blue-600 font-bold"
                                >
                                    {content.linkText}
                                </Link>
                            </span>
                        </div>
                        <div>
                            {/* @ts-ignore */}
                            <Button type="submit" intent="secondary">
                                {content.buttonText}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    )
}
