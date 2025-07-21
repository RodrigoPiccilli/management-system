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

const AddJobDialog = () => {

    const [form, setForm] = useState({
        jobName: "",
        areaCode: "",
        model: "",
        direction: "",
        stone: "",
        backsplash: undefined,
        installDate: "",
        ft2: undefined,
        community: "",
        address: "",
        sink: "",
        amount: undefined,
        poNumber: ""
    });

    const handleChange = (field: keyof Job) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    return (
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

                    {/* <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>Job Name</TableHead>
                                <TableCell>
                                    <Input placeholder="Job Name" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Area Code</TableHead>
                                <TableCell>
                                    <Input placeholder="Area Code" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Model</TableHead>
                                <TableCell>
                                    <Input placeholder="Model" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Direction</TableHead>
                                <TableCell>
                                    <Input placeholder="Direction" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Stone</TableHead>
                                <TableCell>
                                    <Input placeholder="Stone Type" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Backsplash</TableHead>
                                <TableCell>
                                    <Select>
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
                                    <Input type="date" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>
                                    Ft<sup>2</sup>
                                </TableHead>
                                <TableCell>
                                    <Input placeholder="Ft²" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Community</TableHead>
                                <TableCell>
                                    <Input placeholder="Community" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableCell>
                                    <Input placeholder="Address" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Sink</TableHead>
                                <TableCell>
                                    <Input placeholder="Sink Type" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Amount ($)</TableHead>
                                <TableCell>
                                    <Input placeholder="Amount ($)" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>PO Number</TableHead>
                                <TableCell>
                                    <Input placeholder="PO Number" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>Job Name</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.jobName} 
                                    placeholder="Job Name"
                                    onChange={handleChange("jobName")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Area Code</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.areaCode} 
                                    placeholder="Area Code"
                                    onChange={handleChange("areaCode")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Model</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.model} 
                                    placeholder="Model"
                                    onChange={handleChange("model")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Direction</TableHead>
                                <TableCell>
                                <Select
                                    value={ form.direction}
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
                                    value={ form.backsplash === true ? "Yes" : form.backsplash === false ? "No" : "" }
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Backsplash" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Install Date</TableHead>
                                <TableCell>
                                <Input
                                    type="date"
                                    value={form.installDate}
                                    onChange={handleChange("installDate")}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>FT²</TableHead>
                                <TableCell>
                                <Input
                                    type="number"
                                    value={form.ft2}
                                    onChange={handleChange("ft2")}
                                    placeholder="FT²"
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Community</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.community} 
                                    placeholder="Community"
                                    onChange={handleChange("community")}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.address}
                                    placeholder="Address"
                                    onChange={handleChange("address")}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Sink</TableHead>
                                <TableCell>
                                <Select
                                    value={form.sink }
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
                                    value={form.amount}
                                    placeholder="Amount ($)"
                                    onChange={handleChange("amount")}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>PO Number</TableHead>
                                <TableCell>
                                <Input 
                                    value={form.poNumber} 
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
                        <DialogClose asChild>
                            <Button type="submit">Add</Button>
                        </DialogClose>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
    )

}

export default AddJobDialog;
