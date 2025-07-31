"use client"

import LoadingPage from "@/components/ui/loading";
import { Navigation } from "@/components/ui/Navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useReceivables } from "@/hooks/useReceivables";

export default function Receivables() {
   
    const { jobs, loading, fetchJobs } = useReceivables();

    if (loading) return <LoadingPage/>;

    return ( 
        <div className="outer-div-template">
            
            < Navigation activeTab="receivables"/>
          
            <header className="page-header">
                <h1 className="page-title">Receivables</h1>
            </header>
                
            <div className="data-table">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
            </div>   

        </div>
    )
}