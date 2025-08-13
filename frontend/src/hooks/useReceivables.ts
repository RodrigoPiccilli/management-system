import { useState, useEffect } from 'react';
import api from "@/lib/apis";
import { saveToCache, loadFromCache, UseJobsReturn } from '@/lib/cache'

const CACHE_KEY = 'receivables_cache';

export function useReceivables(): UseJobsReturn<any> {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchJobs = async (forceRefresh: boolean = false): Promise<void> => {

        if (!forceRefresh && loadFromCache(CACHE_KEY, setJobs, setLoading)) {
            return;
        }

        setLoading(true);

        try {

            const [res1, res2] = await Promise.all([
                api.get('/homeowners/receivables'),
                api.get('/contractors/receivables')
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

    const refreshJobs = (): void => {
        fetchJobs(true);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return {
        jobs,
        loading,
        fetchJobs: refreshJobs
    };
}
