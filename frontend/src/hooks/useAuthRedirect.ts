import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

/**
 * @function useAuthRedirect
 * Custom React hook to manage authentication-based redirection using Supabase.
 * 
 * - Checks if a user is authenticated via Supabase on component mount.
 * - If no user is logged in, automatically redirects to the "/login" page.
 * - If a user is logged in, updates the loading state to allow rendering of protected content.
 * 
 * @returns {boolean} `loading` - Indicates whether the authentication check is in progress.
 * 
 * @remarks
 * This hook is intended for pages that require authentication and should redirect unauthenticated users.
 */
export function useAuthRedirect() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data?.user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, [router]);

    return loading;
}