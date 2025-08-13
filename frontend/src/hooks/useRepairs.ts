import { useState, useEffect } from 'react';
import api from "@/lib/apis";
import { Repair } from '@/app/types/job'
import { saveToCache, loadFromCache, UseJobsReturn } from '@/lib/cache'

const CACHE_KEY = 'repairs_cache';

export function useRepairs(): UseJobsReturn<Repair> {
    const [jobs, setJobs] = useState<Repair[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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