"use client"

import { Navigation } from "@/components/ui/Navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingPage from "@/components/ui/loading";
import { useHomeownerJobs } from "@/hooks/useHomeownerJobs";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function HOPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useHomeownerJobs();

    if (loading) return <LoadingPage />;

    return (
        <div className="outer-div-template">

            < Navigation activeTab="homeowners" />

            <header className="page-header">
                <h1 className="page-title">Homeowner Jobs</h1>
            </header>

            <div className="data-table">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs} />
            </div>

        </div>

    )
}
