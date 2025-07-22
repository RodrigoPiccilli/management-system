"use client"

import { Button } from "@/components/ui/button";
import { columns, Job } from "./columns"
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

const AddJobDialog = ({ fetchJobs }: { fetchJobs: () => void }) => {

    const [form, setForm] = useState({
        jobName: "",
        areaCode: "",
        model: "",
        direction: "",
        stone: "",
        backsplash: undefined as boolean | undefined,
        installDate: "",
        ft2: undefined as number | undefined,
        community: "",
        address: "",
        sink: "",
        amount: undefined as number | undefined,
        poNumber: ""
    });

    const [open, setOpen] = useState(false);

    const handleChange = (field: keyof Job) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
       
        e.preventDefault();

        const dataToSend = {
            ...form,
            installDate: form.installDate
                ? new Date(form.installDate).toISOString()
                : undefined,
        };
    
        try {
            await api.post(`/jobs/add`, dataToSend);
            console.log("Job added successfully!");
            setOpen(false); 
            fetchJobs();
        } catch (error) {
            console.error("Failed to add job:", error);
            setOpen(false);
        }
      };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button className="p-6 text-xl cursor-pointer" onClick={() => setOpen(true)}>Add</Button>
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
                                <TableCell>
                                <Input 
                                    value={form.jobName || ""} 
                                    placeholder="Job Name"
                                    onChange={handleChange("jobName")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Area Code</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.areaCode || ""} 
                                    placeholder="Area Code"
                                    onChange={handleChange("areaCode")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Model</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.model || ""} 
                                    placeholder="Model"
                                    onChange={handleChange("model")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Direction</TableHead>
                                <TableCell>
                                <Select
                                    value={ form.direction || ""}
                                    onValueChange={(value) =>
                                        setForm({ ...form, direction: value })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Direction" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="Per Plan">Per Plan</SelectItem>
                                    <SelectItem value="Reverse">Reverse</SelectItem>
                                    </SelectContent>
                                </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Stone</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.stone || ""}
                                    placeholder="Stone Type"
                                    onChange={handleChange("stone")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Backsplash</TableHead>
                                <TableCell>
                                <Select
                                   value={form.backsplash === true ? "yes" : form.backsplash === false ? "no" : ""}
                                    onValueChange={value =>
                                    setForm({...form, backsplash: value === "yes" ? true : value === "no" ? false : undefined })
                                    }>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Backsplash" />
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
                                <TableCell>
                                <Input
                                    type="date"
                                    value={form.installDate || ""}
                                    onChange={handleChange("installDate")}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>FT²</TableHead>
                                <TableCell>
                                <Input
                                    type="number"
                                    value={form.ft2 != null ? form.ft2 : ""}
                                    onChange={e =>
                                        setForm({
                                          ...form,
                                          ft2: e.target.value === "" ? undefined : Number(e.target.value)
                                        })
                                      }
                                    placeholder="FT²"
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Community</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.community || ""} 
                                    placeholder="Community"
                                    onChange={handleChange("community")}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.address || ""}
                                    placeholder="Address"
                                    onChange={handleChange("address")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Sink</TableHead>
                                <TableCell>
                                <Select
                                    value={form.sink || ""}
                                    onValueChange={value => setForm({ ...form, sink: value })}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sink Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="Single Bowl">Single Bowl</SelectItem>
                                    <SelectItem value="50/50">50/50</SelectItem>
                                    </SelectContent>
                                </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Amount</TableHead>
                                <TableCell>
                                <Input
                                    type="number"
                                    value={form.amount != null ? form.amount : ""}
                                    placeholder="Amount ($)"
                                    onChange={e =>
                                        setForm({
                                          ...form,
                                          amount: e.target.value === "" ? undefined : Number(e.target.value)
                                        })
                                      }
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>PO Number</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.poNumber || ""} 
                                    placeholder="PO Number"
                                    onChange={handleChange("poNumber")}
                                />
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                            <Button type="submit" onClick={handleSubmit}>Add</Button>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
    )

}

export default AddJobDialog;
