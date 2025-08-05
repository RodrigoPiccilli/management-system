"use client"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";


export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setMessage("Login failed: " + error.message);
        } else {
            setMessage("Login successful! Redirecting...");
            router.push("/nvr");
        }
  };

    return (
        <div className={"flex flex-col gap-6"}>
            <Card>
                <CardHeader>
                    <CardTitle>Login with Email</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                            Login
                            </Button>
                            {message && (
                                <div className="mt-4 text-center text-red-600">{message}</div>
                                )}
                        </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
