import { useState, useEffect } from 'react';

import api from "@/lib/apis";

export function useNvrJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get('/nvr')
        .then(
            res => setJobs(res.data)
        )
        .catch(
            err => console.error('Axios error:', err)
        )
        .finally(() => setLoading(false));
    }, []);

  return { jobs, loading };
}
