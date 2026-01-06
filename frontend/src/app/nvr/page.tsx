"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useNVRJobs } from "@/hooks/useNVRJobs";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

/**
 * NVRPage
 *
 * Page component for displaying and managing NVR jobs.
 *
 * Features:
 * - Enforces authentication redirect via useAuthRedirect().
 * - Fetches NVR jobs using useNVRJobs().
 * - Renders DataTable with job data, global filtering, and refresh capability.
 * - Shows LoadingPage while jobs are being fetched.
 */
export default function NVRPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useNVRJobs();

    return (
        <div className="outer-div-template">

            < Navigation activeTab="nvr"/>

            <header className="page-header">
                <h1 className="page-title">NVR Jobs</h1>
            </header>

            {
                !loading ? (
                    <div className="data-table">
                        <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs} />
                    </div>
                ) : (
                    <LoadingPage />
                )
            }


        </div>
    )
}
