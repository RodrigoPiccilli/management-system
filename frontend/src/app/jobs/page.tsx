import { Button } from "@/components/ui/button";
import { TabsMenu } from "@/components/ui/TabsMenu";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Job[]> {
    // Fetch data from your API here.
    return [
        {
            id: "IG-80",
            material: "Frost White",
            direction: "per plan",
            model: "hudson",
          },
          {
              id: "IG-81",
              material: "Luna Pearl",
              direction: "reverse",
              model: "aspen",
          },
      
    ]
  }


export default async function JobsPage() {

    const data = await getData();




    return ( 
         <div>
             <TabsMenu/>

             <h1 className="text-5xl text-center mt-20 mb-5">NVR Jobs</h1>
             
            <div className="flex justify-center gap-7 w-full bg-amber-500">
                <Button className="p-6 text-xl cursor-pointer">Add</Button>
                <Button className="p-6 text-xl cursor-pointer">Search</Button>
                <Button className="p-6 text-xl cursor-pointer">Filter</Button>
                <Button className="p-6 text-xl cursor-pointer">Sort</Button>
             </div>

             <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
                
        
        </div>

    )
}

// export default JobsPage;
