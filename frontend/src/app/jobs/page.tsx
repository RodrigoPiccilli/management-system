"use client"

import { Button } from "@/components/ui/button";
import { TabsMenu } from "@/components/ui/TabsMenu";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"

import { useEffect, useState} from "react"
import api from "@/lib/apis";
import AddJobDialog from "./AddJob";


export default function JobsPage() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/jobs")
          .then(res => {
            setJobs(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Axios error:", err);
            setLoading(false);
          });
      }, []);
    
      if (loading) return <div>Loading...</div>;

    return ( 
         <div>
             <TabsMenu/>

             <h1 className="text-5xl text-center mt-20 mb-5">NVR Jobs</h1>
             
            <div className="flex justify-center gap-7 w-full bg-amber-500">
                <AddJobDialog />
            </div>

             <div className="container mx-auto py-10">
                <DataTable columns={columns} data={jobs} />
            </div>
                
        
        </div>

    )
}

// export default JobsPage;
