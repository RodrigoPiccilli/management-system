"use client"

import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/Navigation";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"

import { useEffect, useState} from "react"
import api from "@/lib/apis";


export default function NVRPage() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = () => {
        setLoading(true);
        api.get("/nvr")
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

    if (loading) return <div>Loading...</div>;

    return ( 
         <div className="bg-slate-50 h-screen w-screen">

            <div className="h-15 bg-slate-100 text-slate-700 px-17">
                < Navigation/>
            </div> 

             <div className="container mx-auto mt-10 mb-5">
                <h1 className="text-5xl text-left text-slate-900">NVR Jobs</h1>
            </div>
             
            {/* <div className="flex justify-center gap-7 w-full">
                <AddJobDialog fetchJobs={fetchJobs} />
            </div> */}

             <div className="container mx-auto pt-5">
                <DataTable columns={columns(fetchJobs)} data={jobs} fetchJobs={fetchJobs}/>
            </div>
                
        
        </div>

    )
}
