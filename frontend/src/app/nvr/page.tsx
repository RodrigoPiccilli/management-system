"use client"

import { Navigation } from "@/components/ui/Navigation";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"
import LoadingPage from "@/components/ui/loading";
import { useNVRJobs } from "@/hooks/useNVRJobs";


export default function NVRPage() {

    const { jobs, loading, fetchJobs } = useNVRJobs();

    if (loading) return <LoadingPage />

    return ( 
         <div className="bg-slate-50 h-screen w-screen">

            <div className="h-15 bg-slate-100 text-slate-700 px-17">
                < Navigation/>
            </div> 

             <header className="container mx-auto mt-10 mb-5">
                <h1 className="text-5xl text-left text-slate-900">NVR Jobs</h1>
            </header>
             
             <div className="container mx-auto pt-5">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
             </div>
                
        
        </div>

    )
}
