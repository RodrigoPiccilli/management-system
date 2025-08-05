"use client"

import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"

import { Checkbox } from "@/components/ui/Checkbox"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"

import { Input } from "@/components/ui/Input"

import { useEffect, useState } from "react"
import api from "@/lib/apis";

type JobForm = Record<string, any>;

interface AddJobDialogProps {
    apiEndpoint: string;
    initialForm: JobForm;
    title: string;
    fetchJobs: () => void;
}

const AddJobDialog = ({ apiEndpoint, initialForm, title, fetchJobs }: AddJobDialogProps) => {


    const [form, setForm] = useState<JobForm>(initialForm);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setForm(initialForm);
    }, [open, initialForm]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const dataToSend = {
            ...form,
            ...(form.installDate ? { installDate: new Date(form.installDate).toISOString() } : {}),
        };

        try {
            console.log(dataToSend);
            await api.post(apiEndpoint, dataToSend);
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
                    <Button variant="primary" className="mx-2 max-w-20" onClick={() => setOpen(true)}>Add</Button>

                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <Table>
                        <TableBody>
                            {"jobName" in form && (
                                <TableRow>
                                    <TableHead>Job Name</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.jobName || ""}
                                            placeholder="Job Name"
                                            onChange={handleChange("jobName")} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"areaCode" in form && (
                                <TableRow>
                                    <TableHead>Area Code</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.areaCode || ""}
                                            placeholder="Area Code"
                                            onChange={handleChange("areaCode")} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"model" in form && (
                                <TableRow>
                                    <TableHead>Model</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.model || ""}
                                            placeholder="Model"
                                            onChange={handleChange("model")} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"direction" in form && (
                                <TableRow>
                                    <TableHead>Direction</TableHead>
                                    <TableCell>
                                        <Select
                                            value={form.direction || ""}
                                            onValueChange={(value) =>
                                                setForm({ ...form, direction: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                <SelectValue placeholder="Direction" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Per Plan">Per Plan</SelectItem>
                                                <SelectItem value="Reverse">Reverse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            )}
                            {"stone" in form && (
                                <TableRow>
                                    <TableHead>Stone</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.stone || ""}
                                            placeholder="Stone Type"
                                            onChange={handleChange("stone")} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"backsplash" in form && (
                                <TableRow>
                                    <TableHead>Backsplash</TableHead>
                                    <TableCell>
                                        <Select
                                            value={form.backsplash === true ? "yes" : form.backsplash === false ? "no" : ""}
                                            onValueChange={value =>
                                                setForm({ ...form, backsplash: value === "yes" ? true : value === "no" ? false : undefined })
                                            }>
                                            <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                <SelectValue placeholder="Backsplash" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            )}
                            {"installDate" in form && (
                                <TableRow>
                                    <TableHead>Install Date</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            type="date"
                                            value={form.installDate || ""}
                                            onChange={handleChange("installDate")}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"installedBy" in form && (
                                <TableRow>
                                    <TableHead>Installed By</TableHead>
                                    <TableCell>
                                        <Select
                                            value={form.installedBy || ""}
                                            onValueChange={(value) =>
                                                setForm({ ...form, installedBy: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                <SelectValue placeholder="Installed By" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Lionel">Lionel</SelectItem>
                                                <SelectItem value="Umberto">Umberto</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            )}
                            {"ft2" in form && (
                                <TableRow>
                                    <TableHead>FT²</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
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
                            )}
                            {"community" in form && (
                                <TableRow>
                                    <TableHead>Community</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.community || ""}
                                            placeholder="Community"
                                            onChange={handleChange("community")}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"address" in form && (
                                <TableRow>
                                    <TableHead>Address</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.address || ""}
                                            placeholder="Address"
                                            onChange={handleChange("address")} />
                                    </TableCell>
                                </TableRow>
                            )}
                            {"sink" in form && (
                                <TableRow>
                                    <TableHead>Sink</TableHead>
                                    <TableCell>
                                        <Select
                                            value={form.sink || ""}
                                            onValueChange={value => setForm({ ...form, sink: value })}
                                        >
                                            <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                <SelectValue placeholder="Sink Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Single Bowl">Single Bowl</SelectItem>
                                                <SelectItem value="50/50">50/50</SelectItem>
                                                <SelectItem value="Farm Sink">Farm Sink</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            )}
                            {"amount" in form && (
                                <TableRow>
                                    <TableHead>Amount</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
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
                            )}
                            {"poNumber" in form && (
                                <TableRow>
                                    <TableHead>PO Number</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.poNumber || ""}
                                            placeholder="PO Number"
                                            onChange={handleChange("poNumber")}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {"deposit" in form && (

                        <div className="flex justify-evenly mb-5">

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="deposit"
                                    className="w-5 h-5 border-indigo-500 border-2 data-[state=checked]:bg-indigo-500"
                                    checked={!!form.deposit}
                                    onCheckedChange={(checked) =>
                                        setForm({ ...form, deposit: checked === true })
                                    }
                                />
                                <label htmlFor="deposit" className="">Deposit</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="final"
                                    className="w-5 h-5 border-indigo-500 border-2 data-[state=checked]:bg-indigo-500"
                                    checked={form.final}
                                    onCheckedChange={(checked) =>
                                        setForm({ ...form, final: checked === true })
                                    }
                                />
                                <label htmlFor="final" className="">Final</label>
                            </div>

                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" onClick={handleSubmit}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )

}

export default AddJobDialog;

