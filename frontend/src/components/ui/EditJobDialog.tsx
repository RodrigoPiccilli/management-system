import { useEffect, useState } from "react";
import {
    Dialog,
    DialogDescription,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Input,
    Button,
    Checkbox,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui";
import api from "@/lib/apis"
import { ContractorJob, HomeownerJob, NVRJob } from "@/app/types/job";
import { invalidateCache } from "@/lib/cache";

interface EditJobDialogProps {
    apiEndpoint: string;
    job: NVRJob | HomeownerJob | ContractorJob;
    fetchJobs: () => void;
}

const EditJobDialog = ({ apiEndpoint, job, fetchJobs }: EditJobDialogProps) => {

    const [form, setForm] = useState({ ...job });
    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (open) setForm(job);

    }, [open, job]);

    const handleChange = <T extends keyof (NVRJob & HomeownerJob & ContractorJob)>(field: T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: e.target.value });
        };

    const handleDelete = async () => {
        try {
            await api.delete(`${apiEndpoint}/${job.jobName}`)
            fetchJobs();
            setOpen(false);
            console.log("Job deleted successfully!");

            if (apiEndpoint === "/homeowners" || apiEndpoint === "/contractors") {
                invalidateCache('receivables_cache');
            }
        } catch (error) {
            console.error("Failed to delete job: ", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.put((`${apiEndpoint}/${form.jobName}`), form);
            fetchJobs();
            setOpen(false);
            console.log("Job updated successfully!");

            if (apiEndpoint === "/homeowners" || apiEndpoint === "/contractors") {
                invalidateCache('receivables_cache');
            }
        } catch (error) {
            console.error("Failed to update job:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">{job.jobName}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle><span className="text-indigo-500">Edit</span> {job.jobName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>

                    {apiEndpoint === "/nvr" && (
                        <div className="flex gap-[2rem]">
                            <Table>
                                <TableBody>
                                    {"jobName" in form && (
                                        <TableRow>
                                            <TableHead>Job Name</TableHead>
                                            <TableCell>
                                                <Input value={form.jobName || ""} readOnly className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"areaCode" in form && (
                                        <TableRow>
                                            <TableHead>Area Code</TableHead>
                                            <TableCell>
                                                <Input value={form.areaCode || ""} onChange={handleChange("areaCode")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"model" in form && (
                                        <TableRow>
                                            <TableHead>Model</TableHead>
                                            <TableCell>
                                                <Input value={form.model || ""} onChange={handleChange("model")} className="border-slate-300 focus:border-indigo-500" />
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
                                                <Input value={form.stone || ""} onChange={handleChange("stone")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"backsplash" in form && (
                                        <TableRow>
                                            <TableHead>Backsplash</TableHead>
                                            <TableCell>
                                                <Select
                                                    value={form.backsplash === true ? "Yes" : form.backsplash === false ? "No" : ""}
                                                    onValueChange={(value) =>
                                                        setForm({ ...form, backsplash: value === "Yes" ? true : value === "No" ? false : undefined })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                        <SelectValue placeholder="Backsplash" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Yes">Yes</SelectItem>
                                                        <SelectItem value="No">No</SelectItem>
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
                                                    value={form.installDate ? form.installDate.substring(0, 10) : ""}
                                                    onChange={e => {
                                                        setForm({ ...form, installDate: new Date(e.target.value).toISOString() });
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
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
                                                    type="number"
                                                    value={form.ft2 != undefined ? form.ft2 : ""}
                                                    onChange={e =>
                                                        setForm({
                                                            ...form,
                                                            ft2: e.target.value === "" ? undefined : Number(e.target.value)
                                                        })
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"community" in form && (
                                        <TableRow>
                                            <TableHead>Community</TableHead>
                                            <TableCell>
                                                <Input value={form.community || ""} onChange={handleChange("community")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"address" in form && (
                                        <TableRow>
                                            <TableHead>Address</TableHead>
                                            <TableCell>
                                                <Input value={form.address || ""} onChange={handleChange("address")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"sink" in form && (
                                        <TableRow>
                                            <TableHead>Sink</TableHead>
                                            <TableCell>
                                                <Select
                                                    value={form.sink || ""}
                                                    onValueChange={(value) =>
                                                        setForm({ ...form, sink: value })
                                                    }
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
                                                    type="number"
                                                    value={form.amount != null ? form.amount : ""}
                                                    onChange={e =>
                                                        setForm({ ...form, amount: e.target.value === "" ? undefined : Number(e.target.value) })
                                                    }
                                                    className="border-slate-300 focus:border-indigo-500"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"poNumber" in form && (
                                        <TableRow>
                                            <TableHead>PO Number</TableHead>
                                            <TableCell>
                                                <Input value={form.poNumber || ""} onChange={handleChange("poNumber")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {apiEndpoint === "/homeowners" && (
                        <div className="flex gap-[2rem]">
                            <Table>
                                <TableBody>
                                    {"jobName" in form && (
                                        <TableRow>
                                            <TableHead>Job Name</TableHead>
                                            <TableCell>
                                                <Input value={form.jobName || ""} readOnly className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {"stone" in form && (
                                        <TableRow>
                                            <TableHead>Stone</TableHead>
                                            <TableCell>
                                                <Input value={form.stone || ""} onChange={handleChange("stone")} className="border-slate-300 focus:border-indigo-500" />
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
                                                    value={form.installDate ? form.installDate.substring(0, 10) : ""}
                                                    onChange={e => {
                                                        setForm({ ...form, installDate: new Date(e.target.value).toISOString() });
                                                    }}
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
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
                                    {"ft2" in form && (
                                        <TableRow>
                                            <TableHead>FT²</TableHead>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={form.ft2 != undefined ? form.ft2 : ""}
                                                    onChange={e =>
                                                        setForm({
                                                            ...form,
                                                            ft2: e.target.value === "" ? undefined : Number(e.target.value)
                                                        })
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {"address" in form && (
                                        <TableRow>
                                            <TableHead>Address</TableHead>
                                            <TableCell>
                                                <Input value={form.address || ""} onChange={handleChange("address")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"sink" in form && (
                                        <TableRow>
                                            <TableHead>Sink</TableHead>
                                            <TableCell>
                                                <Select
                                                    value={form.sink || ""}
                                                    onValueChange={(value) =>
                                                        setForm({ ...form, sink: value })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                        <SelectValue placeholder="Sink Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Single Bowl">Single Bowl</SelectItem>
                                                        <SelectItem value="50/50">50/50</SelectItem>
                                                        {apiEndpoint === "/homeowners" && (
                                                            <SelectItem value="Custom">Custom</SelectItem>
                                                        )}


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
                                                    type="number"
                                                    value={form.amount != null ? form.amount : ""}
                                                    onChange={e =>
                                                        setForm({ ...form, amount: e.target.value === "" ? undefined : Number(e.target.value) })
                                                    }
                                                    className="border-slate-300 focus:border-indigo-500"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {apiEndpoint === "/contractors" && (
                        <div className="flex gap-[2rem]">
                            <Table>
                                <TableBody>
                                    {"jobName" in form && (
                                        <TableRow>
                                            <TableHead>Job Name</TableHead>
                                            <TableCell>
                                                <Input value={form.jobName || ""} readOnly className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"contractor" in form && (
                                        <TableRow>
                                            <TableHead>Job Name</TableHead>
                                            <TableCell>
                                                <Select
                                                    value={form.contractor || ""}
                                                    onValueChange={(value) =>
                                                        setForm({ ...form, contractor: value })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                        <SelectValue placeholder="Contractor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ERX">ERX</SelectItem>
                                                        <SelectItem value="NewFloor">NewFloor</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {"stone" in form && (
                                        <TableRow>
                                            <TableHead>Stone</TableHead>
                                            <TableCell>
                                                <Input value={form.stone || ""} onChange={handleChange("stone")} className="border-slate-300 focus:border-indigo-500" />
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
                                                    value={form.installDate ? form.installDate.substring(0, 10) : ""}
                                                    onChange={e => {
                                                        setForm({ ...form, installDate: new Date(e.target.value).toISOString() });
                                                    }}
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
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
                                    {"ft2" in form && (
                                        <TableRow>
                                            <TableHead>FT²</TableHead>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={form.ft2 != undefined ? form.ft2 : ""}
                                                    onChange={e =>
                                                        setForm({
                                                            ...form,
                                                            ft2: e.target.value === "" ? undefined : Number(e.target.value)
                                                        })
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {"address" in form && (
                                        <TableRow>
                                            <TableHead>Address</TableHead>
                                            <TableCell>
                                                <Input value={form.address || ""} onChange={handleChange("address")} className="border-slate-300 focus:border-indigo-500" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {"sink" in form && (
                                        <TableRow>
                                            <TableHead>Sink</TableHead>
                                            <TableCell>
                                                <Select
                                                    value={form.sink || ""}
                                                    onValueChange={(value) =>
                                                        setForm({ ...form, sink: value })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                        <SelectValue placeholder="Sink Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Single Bowl">Single Bowl</SelectItem>
                                                        <SelectItem value="50/50">50/50</SelectItem>
                                                        <SelectItem value="Custom">Custom</SelectItem>
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
                                                    type="number"
                                                    value={form.amount != null ? form.amount : ""}
                                                    onChange={e =>
                                                        setForm({ ...form, amount: e.target.value === "" ? undefined : Number(e.target.value) })
                                                    }
                                                    className="border-slate-300 focus:border-indigo-500"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {"deposit" in form && (

                        <div className="flex justify-evenly mt-5 mb-10">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="deposit" className="w-5 h-5 border-indigo-500 border-2 data-[state=checked]:bg-indigo-500"
                                    checked={!!form.deposit}
                                    onCheckedChange={(checked) =>
                                        setForm({ ...form, deposit: checked === true })
                                    }
                                />
                                <label htmlFor="deposit" className="">Deposit</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="final" className="w-5 h-5 border-indigo-500 border-2 data-[state=checked]:bg-indigo-500"
                                    checked={form.final}
                                    onCheckedChange={(checked) =>
                                        setForm({ ...form, final: checked === true })
                                    }
                                />
                                <label htmlFor="final" className="">Final</label>
                            </div>

                        </div>

                    )}

                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle><span className="font-bold text-red-500">Delete </span>{job.jobName}?</DialogTitle>
                                    <DialogDescription>This action cannot be undone.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="button" variant="destructive" onClick={() => { handleDelete() }}>Delete</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" >Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}






export { EditJobDialog };



