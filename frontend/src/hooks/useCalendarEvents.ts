import { useState, useEffect, useCallback } from 'react';
import api from "@/lib/apis";

interface CalendarEvent {
    id: string;
    title: string;
    start: string;
}

export const useCalendarEvents = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<any[]>([]);

    const transformData = useCallback((jobs: any[], jobType: 'nvr' | 'homeowners') =>
        jobs.map(job => ({
            // id: `${job.jobName}`,
            id: `${jobType}-${job.jobName}`,
            title: job.jobName,
            start: new Date(job.installDate).toISOString().split('T')[0],
            color: job.installedBy === 'Lionel' ? 'rgb(16, 185, 129)' : 'rgb(56, 189, 248)',
        })), []
    );

    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            const [res1, res2] = await Promise.all([
                api.get(`/nvr`),
                api.get(`/homeowners`)
            ]);

            const nvrEvents = transformData(res1.data, 'nvr');
            const homeownerEvents = transformData(res2.data, 'homeowners');

            setEvents([...nvrEvents, ...homeownerEvents]);


        } catch (err) {
            console.log('Axios error:', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [transformData]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return { events, loading, refetch: fetchJobs };
};