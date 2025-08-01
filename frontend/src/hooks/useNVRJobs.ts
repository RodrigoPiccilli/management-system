import { useState, useEffect } from 'react';

import api from "@/lib/apis";

export function useNVRJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = () => {
        setLoading(true);
        api.get('/nvr')
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
