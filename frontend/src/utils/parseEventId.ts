export function parseEventId(eventId: string): { jobType: string; jobName: string } {
    const [jobType, ...jobNameParts] = eventId.split('-');
    return {
        jobType,
        jobName: jobNameParts.join('-'),
    };
}
