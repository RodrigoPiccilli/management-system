export type NVRJob = {
    id: string;
    jobName: string;
    areaCode?: string;
    model?: string;
    direction?: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string;
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
    ft2?: number;
    address?: string;
    sink?: string;
    amount?: number;
    deposit?: boolean;
    final?: boolean;
};