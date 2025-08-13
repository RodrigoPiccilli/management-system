import { useState, useEffect } from 'react';
import api from "@/lib/apis";

export function usePrefixMapping(prefix: string): string | undefined {

    const [communityMapping, setCommunity] = useState<string | undefined>();

    const fetchCommunity = async () => {


        try {
            const res = await api.get(`/prefix-mappings/${prefix}`);
            const communityName = res.data.community;
            setCommunity(communityName);

        } catch (err: any) {
            console.error('Axios error:', err);

        }
    };

    useEffect(() => {
        fetchCommunity();
    }, [prefix]);

    return communityMapping
}