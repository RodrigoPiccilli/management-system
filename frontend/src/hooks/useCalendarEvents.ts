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

    const transformData = useCallback((jobs: any[], jobType: 'nvr' | 'homeowners' | 'repairs' | 'contractors') =>
        jobs.map(job => ({
            id: `${jobType}-${job.jobName}`,
            title: job.jobName,
            start: new Date(job.installDate).toISOString().split('T')[0],
            color: jobType === 'repairs' ? 'red' : job.installedBy === 'Lionel' ? 'rgb(16, 185, 129)' : job.installedBy === "Umberto" ? 'rgb(56, 189, 248)' : "rgb(122,122,122)",
            extendedProps: {
                jobType: jobType,
                installedBy: job.installedBy || "Unassigned"
            }
        })), []
    );

    const fetchJobs = useCallback(async () => {

        try {
            setLoading(true);
            const [res1, res2, res3, res4] = await Promise.all([
                api.get(`/nvr/installed`),
                api.get(`/homeowners/installed`),
                api.get(`/contractors/installed`),
                api.get(`/repairs/installed`),
            ]);

            const nvrEvents = transformData(res1.data, 'nvr');
            const homeownerEvents = transformData(res2.data, 'homeowners');
            const contractorEvents = transformData(res3.data, 'contractors');
            const repairEvents = transformData(res4.data, 'repairs');


            const allEvents = ([...nvrEvents, ...homeownerEvents, ...contractorEvents, ...repairEvents]);
            // const sortedEvents = allEvents.sort((a, b) => {

            //     const installedByComparison = a.installedBy.localeCompare(b.installedBy);
            //     if (installedByComparison !== 0) {
            //         return installedByComparison;
            //     }

            //     if (a.jobType === 'repairs' && b.jobType !== 'repairs') {
            //         return -1;
            //     }
            //     if (b.jobType === 'repairs' && a.jobType !== 'repairs') {
            //         return 1;
            //     }

            //     return a.jobType.localeCompare(b.jobType);
            // }); 

            setEvents(allEvents);



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