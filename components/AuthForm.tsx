'use client';

import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { login, register } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";

const registerContent = {
    linkurl: "/login",
    linkText: "Already have account?",
    header: "Create a new account",
    subHeader: "Just few things to get started",
    buttonText: "Register"
}

const loginContent = {
    linkurl: "/register",
    linkText: "Don't have account?",
    header: "Welcome back",
    subHeader: "Enter credentials to access your account",
    buttonText: "Login"
}


export default function AuthForm({ mode }: { mode: "register" | "login" }) {

    const [error, setError] = useState("");

    const content = mode === "register" ? registerContent : loginContent;

    return (
        <Card>
            <div className="w-full">
                <div className="text-center">
                    <h2 className="text-3xl mb-2">{content.header}</h2>
                    <p className="text-lg text-black/25">{content.subHeader}</p>
                </div>
                <form action={mode === "register" ? register : login} className="py-10 w-full">
                    {mode === "register" && (
                        <div className="flex mb-8 justify-between">
                            <div className="pr-2">
                                <div className="text-lg mb-4 ml-2 text-blacl/50">First Name</div>
                                <Input
                                    name="firstName"
                                    type="text"
                                    required
                                    className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="pr-2">
                                <div className="text-lg mb-4 ml-2 text-blacl/50">Last Name</div>
                                <Input
                                    name="lastName"
                                    type="text"
                                    required
                                    className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-8">
                            <div className="text-lg mb-4 ml-2 text-blacl/50">Email</div>
                            <Input
                                name="email"
                                type="email"
                                required
                                className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                placeholder="Email"
                            />
                    </div>
                    <div className="mb-8">
                            <div className="text-lg mb-4 ml-2 text-blacl/50">Password</div>
                            <Input
                                name="password"
                                type="password"
                                required
                                className="border-solid border-2 border-gray rounded-3xl px-6 py-2 w-full"
                                placeholder="Password"
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
