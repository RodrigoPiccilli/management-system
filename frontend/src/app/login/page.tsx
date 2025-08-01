"use client"

import LoadingPage from "@/components/ui/loading";
import { LoginForm } from "@/components/ui/login-form";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

export default function Login() {

    const loading = useLoginRedirect();

    if (loading) return <LoadingPage />

    return (

        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>

    );
}