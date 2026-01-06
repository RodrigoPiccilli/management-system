import { useState, useEffect, useCallback } from 'react';
import api from "@/lib/apis";

/**
 * @interface CalendarEvent
 * Represents a single calendar event derived from job data.
 * 
 * @property {string} id - Unique identifier for the event, typically combining job type and job name.
 * @property {string} title - The title of the event, usually the job name.
 * @property {string} start - ISO date string representing the start date of the event.
 * @property {string} [color] - Optional color for the event based on job type or installer.
 * @property {object} [extendedProps] - Additional metadata about the job.
 * @property {string} extendedProps.jobType - Type of the job (e.g., 'nvr', 'homeowners', 'repairs', 'contractors').
 * @property {string} extendedProps.installedBy - Name of the installer or "Unassigned".
 */
interface CalendarEvent {
    id: string;
    title: string;
    start: string;
}

/**
 * @function useCalendarEvents
 * Custom React hook to fetch and transform job data into calendar events.
 * 
 * - Fetches installed jobs from multiple endpoints (`nvr`, `homeowners`, `contractors`, `repairs`).
 * - Transforms raw job data into a standard `CalendarEvent` format with colors and metadata.
 * - Provides loading state and a `refetch` function to refresh the events.
 * 
 * @returns {{
 *   events: CalendarEvent[];
 *   loading: boolean;
 *   refetch: () => Promise<void>;
 * }} An object containing:
 *  - `events`: Array of transformed calendar events.
 *  - `loading`: Boolean indicating whether data fetching is in progress.
 *  - `refetch`: Function to manually refresh the calendar events.
 */
export const useCalendarEvents = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<any[]>([]);

    /**
     * @function transformData
     * Converts raw job data into `CalendarEvent` objects with color coding and extended properties.
     * 
     * @param {any[]} jobs - Array of job objects fetched from API.
     * @param {'nvr' | 'homeowners' | 'repairs' | 'contractors'} jobType - Type of job for color coding and ID generation.
     * @returns {CalendarEvent[]} Array of transformed calendar events.
     */
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

    /**
     * @function fetchJobs
     * Fetches installed jobs from multiple endpoints and updates the `events` state.
     */
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

            const allEvents = [...nvrEvents, ...homeownerEvents, ...contractorEvents, ...repairEvents];

            setEvents(allEvents);
        } catch (err) {
            console.log('Axios error:', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [transformData]);

    // Fetch events on mount
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return { events, loading, refetch: fetchJobs };
};