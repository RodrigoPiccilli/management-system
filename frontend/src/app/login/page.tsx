"use client"

import { LoginForm, LoadingPage } from "@/components/ui";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

/**
 * Login
 *
 * Page component for user login.
 *
 * Features:
 * - Uses useLoginRedirect() to check if user is already authenticated and redirect accordingly.
 * - Displays LoadingPage while authentication check is in progress.
 * - Renders LoginForm centered on the page once ready.
 *
 * Notes:
 * - The layout uses responsive padding and max-width for the form container.
 */
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