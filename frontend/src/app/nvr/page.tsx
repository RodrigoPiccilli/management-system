"use client"

import { Button } from "@/components/ui/button";
import { TabsMenu } from "@/components/ui/TabsMenu";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"

import { useEffect, useState} from "react"
import api from "@/lib/apis";
import AddJobDialog from "./AddJob";


export default function NVRPage() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = () => {
        setLoading(true);
        api.get("/jobs")
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
         <div className="bg-gray-100 h-screen w-screen">
             < TabsMenu/>

             <div className="container mx-auto mt-10 mb-5">
                <h1 className="text-5xl text-left">NVR Jobs</h1>
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
