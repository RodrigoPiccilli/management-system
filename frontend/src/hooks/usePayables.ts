import { useState, useEffect } from 'react';
import api from "@/lib/apis";

interface UsePayablesParams {
    dateFrom?: Date;
    dateTo?: Date;
    enabled?: boolean;
}

export function usePayables(params: UsePayablesParams) {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        if (!params.enabled || !params.dateFrom || !params.dateTo) {
            setJobs([]);
            return;
        }

        const from = params.dateFrom.toISOString().split('T')[0];
        const to = params.dateTo.toISOString().split('T')[0];

        setLoading(true);

        try {
            const [res1, res2] = await Promise.all([
                api.get(`/nvr/from/${from}/to/${to}`),
                api.get(`/homeowners/from/${from}/to/${to}`)
            ]);

            setJobs([...res1.data, ...res2.data]);
        } catch (err) {
            console.log('Axios error:', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.enabled && params.dateFrom && params.dateTo) {
            fetchJobs();
        } else {
            setJobs([]);
        }
    }, [params.dateFrom, params.dateTo, params.enabled]);

    return { jobs, loading, fetchJobs };
}