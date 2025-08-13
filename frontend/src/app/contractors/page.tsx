"use client"

import { Navigation, LoadingPage } from "@/components/ui";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useNVRJobs } from "@/hooks/useNVRJobs";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function ContractorsPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useNVRJobs();

    return (
        <div className="outer-div-template">

            < Navigation activeTab="contractors" />

            <header className="page-header">
                <h1 className="page-title">Contractor Jobs</h1>
            </header>


            {/* {
                !loading ? (
                    <div className="data-table">
                        <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs} />
                    </div>
                ) : (
                    <LoadingPage />
                )
            } */}


        </div>
    )
}
