interface CacheData<T = any> {
    jobs: T[];
    timestamp: number;
}

export interface UseJobsReturn<T = any> {
    jobs: T[];
    loading: boolean;
    fetchJobs: () => void;
}

const CACHE_DURATION = 12 * 60 * 60 * 1000;

const isCacheValid = (cacheData: CacheData): boolean => {
    if (!cacheData || !cacheData.timestamp) return false;
    const now = new Date().getTime();
    return (now - cacheData.timestamp) < CACHE_DURATION;
};

const loadFromCache = <T>(
    cacheKey: string,
    setJobs: (jobs: T[]) => void,
    setLoading: (loading: boolean) => void
): boolean => {
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const cacheData: CacheData<T> = JSON.parse(cached);
            if (isCacheValid(cacheData)) {
                setJobs(cacheData.jobs);
                setLoading(false);
                return true;
            }
        }
    } catch (err) {
        console.warn('Failed to load from cache:', err);
    }

    return false;
};

const saveToCache = <T>(cacheKey: string, jobsData: T[]): void => {
    try {
        const cacheData: CacheData = {
            jobs: jobsData,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (err) {
        console.warn('Failed to save to cache:', err);
    }
};

const invalidateCache = (cacheKey: string) => {
    localStorage.removeItem(cacheKey);
};

export { saveToCache, loadFromCache, invalidateCache };
