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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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

                            {/* <div className="grid gap-4">
                                <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input id="username-1" name="username" defaultValue="@peduarte" />
                                </div>
                            </div> */}

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
                                        <TableHead>Stone</TableHead>
                                        <TableCell><Input placeholder="Stone Type"/></TableCell>
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
                                        <TableHead>Sink</TableHead>
                                        <TableCell><Input placeholder="Sink Type"/></TableCell>
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
                <DataTable columns={columns} data={data} />
            </div>
                
        
        </div>

    )
}

// export default JobsPage;
