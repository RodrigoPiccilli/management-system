"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useHomeownerJobs } from "@/hooks/useHomeownerJobs";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

/**
 * HOPage
 *
 * Page component for displaying and managing homeowner jobs.
 *
 * Features:
 * - Enforces authentication redirect via useAuthRedirect()
 * - Fetches homeowner jobs using useHomeownerJobs()
 * - Renders DataTable with job data and refresh capability
 * - Shows LoadingPage while jobs are being fetched
 */
export default function HOPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useHomeownerJobs();

    return (
        <div className="outer-div-template">

            < Navigation activeTab="homeowners" />

            <header className="page-header">
                <h1 className="page-title">Homeowner Jobs</h1>
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
