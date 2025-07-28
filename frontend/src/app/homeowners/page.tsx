"use client"

import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/Navigation";

import { useEffect, useState } from "react";
import api from "@/lib/apis";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingPage from "@/components/ui/loading";

export default function HOPage() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = () => {
        setLoading(true);
        api.get("/homeowners")
          .then(res => {
            setJobs(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Axios error:", err);
            setLoading(false);
          });
      };
    
      useEffect(() => {
        fetchJobs();
      }, []);

    if (loading) return <LoadingPage/>;

    return ( 
         <div className="h-15 bg-slate-100 text-slate-700 px-17">
             < Navigation/>

             <div className="container mx-auto mt-10 mb-5">
                <h1 className="text-5xl text-left text-slate-900">Homeowner Jobs</h1>
            </div>
             
             <div className="container mx-auto pt-5">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
            </div>            
        
        </div>

    )
}
