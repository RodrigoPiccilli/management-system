/**
 * Job Type Definitions
 *
 * Describes the structure of job entities used throughout the application.
 *
 * NVRJob:
 * - Represents NVR jobs.
 * - Fields:
 *   - id: unique identifier
 *   - jobName: job title, using the standard format :[A-Z][A-Z][0-9][0-9][0-9][0-9]
 *   - areaCode, model, direction, stone, backsplash, installDate, installedBy, ft2, community, address, sink, amount, poNumber
 *
 * HomeownerJob:
 * - Represents homeowner jobs.
 * - Fields:
 *   - id, jobName
 *   - stone, backsplash, installDate, installedBy, ft2, address, sink, amount, deposit, final
 *   - deposit / final are booleans indicating payment status
 *
 * ContractorJob:
 * - Represents contractor jobs.
 * - Fields:
 *   - id, jobName, contractor
 *   - stone, backsplash, installDate, installedBy, ft2, address, sink, amount, deposit, final
 *
 * Repair:
 * - Represents repair jobs.
 * - Fields:
 *   - id, jobName, installDate, installedBy, notes, changeOrder
 *   - changeOrder: boolean indicating if repair required a change order
 */

export type NVRJob = {
    id: string;
    jobName: string;
    areaCode?: string;
    model?: string;
    direction?: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string;
    installedBy?: string;
    ft2?: number;
    community?: string;
    address?: string;
    sink?: string;
    amount?: number;
    poNumber?: string;
};

export type HomeownerJob = {
    id: string;
    jobName: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string;
    installedBy?: string;
    ft2?: number;
    address?: string;
    sink?: string;
    amount?: number;
    deposit?: boolean;
    final?: boolean;
};

export type ContractorJob = {
    id: string;
    jobName: string;
    contractor: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string;
    installedBy?: string;
    ft2?: number;
    address?: string;
    sink?: string;
    amount?: number;
    deposit?: boolean;
    final?: boolean;
};

export type Repair = {
    id: string;
    jobName: string;
    installDate?: string;
    installedBy?: string;
    notes?: string;
    changeOrder?: boolean;
}