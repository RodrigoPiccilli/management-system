"use client"

import { Navigation } from "@/components/ui/Navigation";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import LoadingPage from "@/components/ui/loading";
import { useNVRJobs } from "@/hooks/useNVRJobs";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function NVRPage() {

    useAuthRedirect();

    const { jobs, loading, fetchJobs } = useNVRJobs();

    if (loading) return <LoadingPage />

    return ( 
        <div className="outer-div-template">

            < Navigation activeTab="nvr"/>

            <header className="page-header">
                <h1 className="page-title">NVR Jobs</h1>
            </header>
             
            <div className="data-table">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
            </div>
                
        </div>
    )
}
