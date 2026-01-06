import { useState, useEffect } from 'react';
import api from "@/lib/apis";

/**
 * @interface UsePayablesParams
 * Defines the parameters for the `usePayables` hook.
 * 
 * @property {Date} [dateFrom] - The start date for filtering payables.
 * @property {Date} [dateTo] - The end date for filtering payables.
 * @property {boolean} [enabled] - If false, the hook will not fetch data and will return an empty array.
 */
interface UsePayablesParams {
    dateFrom?: Date;
    dateTo?: Date;
    enabled?: boolean;
}

/**
 * @function usePayables
 * Custom React hook to fetch payables from multiple endpoints within a specified date range.
 * 
 * @param {UsePayablesParams} params - Object containing optional date range and enabled flag.
 * @returns {{ jobs: any[]; loading: boolean; fetchJobs: () => void }} An object containing:
 *  - jobs: Array of payables currently loaded.
 *  - loading: Boolean indicating whether the fetch is in progress.
 *  - fetchJobs: Function to manually trigger a fetch of payables.
 * 
 * @remarks
 * - Automatically fetches data when `dateFrom`, `dateTo`, or `enabled` changes.
 * - If `enabled` is false or dates are missing, the hook returns an empty array and does not fetch.
 */
export function usePayables(params: UsePayablesParams) {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    /**
     * @function fetchJobs
     * Fetches payables from the API endpoints for NVR, homeowners, and contractors within the given date range.
     * Updates state with the combined results.
     */
    const fetchJobs = async () => {
        if (!params.enabled || !params.dateFrom || !params.dateTo) {
            setJobs([]);
            setLoading(false);
            return;
        }

        const from = params.dateFrom.toISOString().split('T')[0];
        const to = params.dateTo.toISOString().split('T')[0];

        setLoading(true);

        try {
            const [res1, res2, res3] = await Promise.all([
                api.get(`/nvr/from/${from}/to/${to}`),
                api.get(`/homeowners/from/${from}/to/${to}`),
                api.get(`/contractors/from/${from}/to/${to}`)
            ]);

            setJobs([...res1.data, ...res2.data, ...res3.data]);
        } catch (err) {
            console.log('Axios error:', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    // Automatically fetch jobs when parameters change
    useEffect(() => {
        fetchJobs();
    }, [params.dateFrom, params.dateTo, params.enabled]);

    return { jobs, loading, fetchJobs };
}