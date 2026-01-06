import { useState, useEffect } from 'react';
import api from "@/lib/apis";
import { saveToCache, loadFromCache, UseJobsReturn } from '@/lib/cache'

const CACHE_KEY = 'receivables_cache';

/**
 * @function useReceivables
 * Custom React hook for managing receivable job data.
 * 
 * Fetches receivable jobs from multiple API endpoints (`/homeowners/installed` and `/contractors/installed`),
 * caches the combined results in localStorage, and provides loading state for UI feedback.
 * Supports force-refreshing the data.
 * 
 * @returns {UseJobsReturn<any>} An object containing:
 *  - jobs: Array of receivable job items currently loaded.
 *  - loading: Boolean indicating whether data is being fetched.
 *  - fetchJobs: Function to refresh the receivable job data, bypassing the cache.
 */
export function useReceivables(): UseJobsReturn<any> {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @function fetchJobs
     * Fetches receivable jobs from API or cache and updates state accordingly.
     * 
     * @param {boolean} [forceRefresh=false] - If true, ignores cached data and fetches fresh data from API.
     */
    const fetchJobs = async (forceRefresh: boolean = false): Promise<void> => {

        if (!forceRefresh && loadFromCache(CACHE_KEY, setJobs, setLoading)) {
            return;
        }

        setLoading(true);

        try {

            const [res1, res2] = await Promise.all([
                api.get('/homeowners/installed'),
                api.get('/contractors/installed')
            ])


            const jobsData: any[] = [...res1.data, ...res2.data];
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
     * Convenience wrapper to force-refresh receivable job data.
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
