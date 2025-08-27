"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRepairs } from "@/hooks/useRepairs";

/**
 * RepairsPage
 *
 * Page component for displaying and managing repair jobs.
 *
 * Features:
 * - Enforces authentication redirect via `useAuthRedirect()`.
 * - Fetches repair jobs using the `useRepairs()` hook.
 * - Displays repair jobs in a `DataTable` with support for sorting, pagination, and inline editing.
 * - Shows `LoadingPage` while repair jobs are being fetched.
 *
 */
export default function RepairsPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useRepairs();

    return (
        <div className="outer-div-template">

            <Navigation activeTab="repairs"/>

            <header className="page-header">
                <h1 className="page-title">Repairs</h1>
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

