import { useState, useEffect } from 'react';
import api from "@/lib/apis";

const CACHE_KEY = 'prefix_cache';

/**
 * @function usePrefixMapping
 * Custom React hook to fetch and return the community name associated with a given prefix.
 * 
 * @param {string} prefix - The prefix string used to look up the community mapping via API.
 * @returns {string | undefined} The name of the community corresponding to the prefix, or `undefined` if not yet loaded.
 * 
 * @remarks
 * The hook automatically refetches the community name whenever the `prefix` changes.
 */
export function usePrefixMapping(prefix: string): string | undefined {
    const [communityMapping, setCommunity] = useState<string | undefined>();

    /**
     * @function fetchCommunity
     * Fetches the community mapping for the provided prefix from the API and updates state.
     */
    const fetchCommunity = async () => {
        try {
            const res = await api.get(`/prefix-mappings/${prefix}`);
            const communityName = res.data.community;
            setCommunity(communityName);
        } catch (err: any) {
            console.error('Axios error:', err);
        }
    };

    // Fetch the community mapping when the prefix changes
    useEffect(() => {
        fetchCommunity();
    }, [prefix]);

    return communityMapping;
}
