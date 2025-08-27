import { useState, useEffect } from 'react';
import api from "@/lib/apis";
import { Repair } from '@/app/types/job'
import { saveToCache, loadFromCache, UseJobsReturn } from '@/lib/cache'

const CACHE_KEY = 'repairs_cache';

/**
 * @function useRepairs
 * Custom React hook for managing repair job data.
 * 
 * Fetches repair jobs from the API, caches them in localStorage, and provides
 * loading state for UI feedback. Supports force-refreshing the data.
 * 
 * @returns {UseJobsReturn<Repair>} An object containing:
 *  - jobs: Array of `Repair` job items currently loaded.
 *  - loading: Boolean indicating whether data is being fetched.
 *  - fetchJobs: Function to refresh the repair job data, bypassing the cache.
 */
export function useRepairs(): UseJobsReturn<Repair> {
    const [jobs, setJobs] = useState<Repair[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @function fetchJobs
     * Fetches repair jobs from API or cache and updates state accordingly.
     * 
     * @param {boolean} [forceRefresh=false] - If true, ignores cached data and fetches fresh data from API.
     */
    const fetchJobs = async (forceRefresh: boolean = false): Promise<void> => {

        if (!forceRefresh && loadFromCache(CACHE_KEY, setJobs, setLoading)) {
            return;
        }

        setLoading(true);

        try {
            const res = await api.get('/repairs');
            const jobsData: Repair[] = res.data;
            setJobs(jobsData);
            saveToCache(CACHE_KEY, jobsData);

        } catch (err: any) {
            console.error('Axios error:', err);

        } finally {
            setLoading(false);
        }
    };

    /**
     * @function refreshJobs
     * Convenience wrapper to force-refresh repair job data.
     */
    const refreshJobs = (): void => {
        fetchJobs(true);
    };

    // Automatically fetch jobs on initial hook mount
    useEffect(() => {
        fetchJobs();
    }, []);

    return {
        jobs,
        loading,
        fetchJobs: refreshJobs
    };
}