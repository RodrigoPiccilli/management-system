"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRepairs } from "@/hooks/useRepairs";


export default function NVRPage() {

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

