import { useState, useEffect } from 'react';

import api from "@/lib/apis";

export function useHomeownerJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = () => {
        setLoading(true);
        api.get('/homeowners')
            .then(
                res => setJobs(res.data)
            )
            .catch(
                err => console.error('Axios error:', err)
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return { jobs, loading, fetchJobs };
}
