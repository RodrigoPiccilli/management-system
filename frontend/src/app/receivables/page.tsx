"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useReceivables } from "@/hooks/useReceivables";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

/**
 * ReceivablesPage
 *
 * Page component for displaying and managing receivable jobs.
 *
 * Features:
 * - Enforces authentication redirect via useAuthRedirect()
 * - Fetches receivable jobs using useReceivables()
 * - Renders DataTable with job data and refresh capability
 * - Shows LoadingPage while jobs are being fetched
 */
export default function Receivables() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useReceivables();

    return (
        <div className="outer-div-template">

            < Navigation activeTab="receivables" />

            <header className="page-header">
                <h1 className="page-title">Receivables</h1>
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