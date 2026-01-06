/** 
 * @interface CacheData
 * Represents the structure of cached data stored in localStorage.
 * 
 * @template T - The type of items being cached. Defaults to `any`.
 * @property {T[]} jobs - The array of cached job items.
 * @property {number} timestamp - The time (in milliseconds since epoch) when the cache was saved.
 */
interface CacheData<T = any> {
    jobs: T[];
    timestamp: number;
}

/**
 * @interface UseJobsReturn
 * Defines the return type for a hook that manages job data.
 * 
 * @template T - The type of job items. Defaults to `any`.
 * @property {T[]} jobs - Array of job items currently loaded.
 * @property {boolean} loading - Indicates whether job data is currently being loaded.
 * @property {() => void} fetchJobs - Function to trigger fetching of job data.
 */
export interface UseJobsReturn<T = any> {
    jobs: T[];
    loading: boolean;
    fetchJobs: () => void;
}

/**
 * @constant {number} CACHE_DURATION
 * The duration (in milliseconds) for which cached data is considered valid.
 * Set to 12 hours.
 */
const CACHE_DURATION = 12 * 60 * 60 * 1000;

/**
 * @function isCacheValid
 * Checks whether a given cache entry is still valid based on its timestamp.
 * 
 * @param {CacheData} cacheData - The cache data object to validate.
 * @returns {boolean} True if the cache is valid; false otherwise.
 */
const isCacheValid = (cacheData: CacheData): boolean => {
    if (!cacheData || !cacheData.timestamp) return false;
    const now = new Date().getTime();
    return (now - cacheData.timestamp) < CACHE_DURATION;
};

/**
 * @function loadFromCache
 * Attempts to load cached job data from localStorage and update state.
 * 
 * @template T
 * @param {string} cacheKey - The key used to store/retrieve cache from localStorage.
 * @param {(jobs: T[]) => void} setJobs - Function to update the jobs state with cached data.
 * @param {(loading: boolean) => void} setLoading - Function to update the loading state.
 * @returns {boolean} True if valid cached data was loaded; false otherwise.
 */
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

/**
 * @function saveToCache
 * Saves job data to localStorage along with a timestamp.
 * 
 * @template T
 * @param {string} cacheKey - The key under which to store the cache in localStorage.
 * @param {T[]} jobsData - The job data to save.
 */
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

/**
 * @function invalidateCache
 * Removes cached job data from localStorage.
 * 
 * @param {string} cacheKey - The key corresponding to the cache entry to remove.
 */
const invalidateCache = (cacheKey: string) => {
    localStorage.removeItem(cacheKey);
};

export { saveToCache, loadFromCache, invalidateCache };
