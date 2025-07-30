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
            <div className="h-15 bg-slate-100 text-slate-700 px-17">
                < Navigation/>
   
                <header className="container mx-auto mt-10 mb-5">
                    <h1 className="text-5xl text-left text-slate-900">Receivables</h1>
                </header>
                
                <div className="container mx-auto pt-5">
                   <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
               </div>            
           
           </div>
   
       )
}