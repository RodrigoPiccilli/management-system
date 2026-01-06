import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

/**
 * @function useLoginRedirect
 * Custom React hook to manage login redirection based on Supabase authentication state.
 * 
 * - Checks if a user is authenticated via Supabase on component mount.
 * - If a user is logged in, automatically redirects to the "/calendar" page.
 * - If no user is logged in, updates loading state to allow rendering of the login page.
 * 
 * @returns {boolean} `loading` - Indicates whether the authentication check is in progress.
 * 
 * @remarks
 * This hook is designed for pages that should redirect authenticated users away from login or landing pages.
 */
export function useLoginRedirect() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                router.replace("/calendar");
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, [router]);

    return loading;
}