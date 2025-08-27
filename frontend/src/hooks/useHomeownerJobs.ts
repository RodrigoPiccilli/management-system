import { useState, useEffect } from 'react';
import api from "@/lib/apis";
import { HomeownerJob } from '@/app/types/job';
import { saveToCache, loadFromCache, UseJobsReturn } from '@/lib/cache'

const CACHE_KEY = 'homeowner_jobs_cache';

/**
 * @function useHomeownerJobs
 * Custom React hook for managing Homeowner job data.
 * 
 * Fetches Homeowner jobs from the API, caches them in localStorage, and provides
 * loading state for UI feedback. Supports force-refreshing the data.
 * 
 * @returns {UseJobsReturn<HomeownerJob>} An object containing:
 *  - jobs: Array of `HomeownerJob` items currently loaded.
 *  - loading: Boolean indicating whether data is being fetched.
 *  - fetchJobs: Function to refresh the Homeowner job data, bypassing the cache.
 */
export function useHomeownerJobs(): UseJobsReturn<HomeownerJob> {
    const [jobs, setJobs] = useState<HomeownerJob[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @function fetchJobs
     * Fetches Homeowner jobs from API or cache and updates state accordingly.
     * 
     * @param {boolean} [forceRefresh=false] - If true, ignores cached data and fetches fresh data from API.
     */
    const fetchJobs = async (forceRefresh: boolean = false): Promise<void> => {
        if (!forceRefresh && loadFromCache(CACHE_KEY, setJobs, setLoading)) {
            return;
        }

        setLoading(true);

        try {
            const res = await api.get('/homeowners');
            const jobsData: HomeownerJob[] = res.data;
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
     * Convenience wrapper to force-refresh Homeowner job data.
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
