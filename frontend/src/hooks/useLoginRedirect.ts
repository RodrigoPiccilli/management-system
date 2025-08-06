import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

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