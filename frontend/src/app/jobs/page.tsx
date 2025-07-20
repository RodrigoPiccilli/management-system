"use client"

import { Button } from "@/components/ui/button";
import { TabsMenu } from "@/components/ui/TabsMenu";
import { columns, Job } from "./columns"
import { DataTable } from "./data-table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { useEffect, useState} from "react"
import api from "@/lib/apis";


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
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button className="p-6 text-xl cursor-pointer">Add</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add NVR Job</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableHead>Job Name</TableHead>
                                        <TableCell><Input placeholder="Job Name"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Area Code</TableHead>
                                        <TableCell><Input placeholder="Area Code"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Model</TableHead>
                                        <TableCell><Input placeholder="Model"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Direction</TableHead>
                                        <TableCell><Input placeholder="Direction"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Stone</TableHead>
                                        <TableCell><Input placeholder="Stone Type"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Backsplash</TableHead>
                                        <TableCell>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Backsplash"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="yes">Yes</SelectItem>
                                                    <SelectItem value="no">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Install Date</TableHead>
                                        <TableCell><Input type="date"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Ft<sup>2</sup></TableHead>
                                        <TableCell><Input placeholder="Ft²"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Community</TableHead>
                                        <TableCell><Input placeholder="Community"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Address</TableHead>
                                        <TableCell><Input placeholder="Address"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Sink</TableHead>
                                        <TableCell><Input placeholder="Sink Type"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Amount ($)</TableHead>
                                        <TableCell><Input placeholder="Amount ($)"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>PO Number</TableHead>
                                        <TableCell><Input placeholder="PO Number"/></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        <DialogFooter>
                            <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                        </DialogContent>
                    </form>
                    </Dialog>
             </div>

             <div className="container mx-auto py-10">
                <DataTable columns={columns} data={jobs} />
            </div>
                
        
        </div>

    )
}

// export default JobsPage;
