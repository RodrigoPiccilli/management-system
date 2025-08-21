"use client"
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Input,
} from '@/components/ui';
import { useEffect, useState } from "react"
import api from "@/lib/apis";
import { invalidateCache } from '@/lib/cache';

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
    const [error, setError] = useState("");

    useEffect(() => {
        setForm(initialForm);
        setError("");
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

        if (apiEndpoint === "/nvr") {

            try {

                const prefix = form.jobName.split("-")[0].toUpperCase();
                const community = await api.get(`/prefix-mappings/${prefix}`);

                console.log(community.data);

                setForm({ ...form, "areaCode": community.data.areaCode });
                setForm({ ...form, "community": community.data.community });

            } catch (error) {
                console.error("Failed to auto-complete job:", error);
            }

        }

        try {
            await api.post(apiEndpoint, dataToSend);
            setError("");
            console.log("Job added successfully!");
            setOpen(false);
            fetchJobs();

            const invalidCache = (apiEndpoint === "/homeowners" || apiEndpoint === "/contractors") ? 'receivables_cache' : null;
            if (invalidCache != null) invalidateCache(invalidCache);

        } catch (error: any) {

            console.error("Failed to add job:", error);

            const { status, data } = error.response;

            if (status === 409 && data.error === 'DUPLICATE_JOB_NAME') {
                setError("Duplicate Job Name");
            } else if (status === 400 && data.error === "MISSING_JOB_NAME") {
                setError("Job Name Required");
            }

            setOpen(true);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="primary" className="mx-2 max-w-20" onClick={() => setOpen(true)}>Add</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-fit">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {error && (
                                <span className="text-base text-red-500 font-semibold">{error}</span>
                            )}</DialogDescription>
                    </DialogHeader>

                    {apiEndpoint === "/nvr" && (
                        <div className="flex gap-[2rem]">
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
                                    {/* {"areaCode" in form && (
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
                                    )} */}
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
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
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

                                    {/* <TableRow>
                                        <TableHead>Community</TableHead>
                                        <TableCell>
                                            <Input
                                                className="border-slate-300 focus:border-indigo-500"
                                                value={form.community || ""}
                                                placeholder="Community"
                                                onChange={handleChange("community")}
                                            />
                                        </TableCell>
                                    </TableRow> */}

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
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {apiEndpoint === "/homeowners" && (
                        <div className="flex gap-[2rem]">
                            <Table>
                                <TableBody>
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
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
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
                                                <SelectContent className="max-h-[10rem] overflow-y-auto">
                                                    <SelectItem value="Sterling Single">Sterling Single</SelectItem>
                                                    <SelectItem value="Sterling 50/50">Sterling 50/50</SelectItem>
                                                    <SelectItem value="60/40">60/40</SelectItem>
                                                    <SelectItem value="40/60">40/60</SelectItem>
                                                    <SelectItem value="20/80">20/80</SelectItem>
                                                    <SelectItem value="80/20">80/20</SelectItem>
                                                    <SelectItem value="Laundry">Laundry</SelectItem>
                                                    <SelectItem value="Bar">Bar</SelectItem>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="0-Radius">0-Radius</SelectItem>
                                                    <SelectItem value="0-Radius-Accessories">0-Radius (Accessories)</SelectItem>
                                                    <SelectItem value="Custom">Custom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
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
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {apiEndpoint === "/contractors" && (
                        <div className="flex gap-[2rem]">
                            <Table>
                                <TableBody>
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
                                    <TableRow>
                                        <TableHead>Contractor</TableHead>
                                        <TableCell>
                                            <Input
                                                className="border-slate-300 focus:border-indigo-500"
                                                value={form.contractor || ""}
                                                placeholder="Contractor"
                                                onChange={handleChange("contractor")} />
                                        </TableCell>
                                    </TableRow>
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

                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
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
                                                <SelectContent className="max-h-[10rem] overflow-y-auto">
                                                    <SelectItem value="Sterling Single">Sterling Single</SelectItem>
                                                    <SelectItem value="Sterling 50/50">Sterling 50/50</SelectItem>
                                                    <SelectItem value="60/40">60/40</SelectItem>
                                                    <SelectItem value="40/60">40/60</SelectItem>
                                                    <SelectItem value="20/80">20/80</SelectItem>
                                                    <SelectItem value="80/20">80/20</SelectItem>
                                                    <SelectItem value="Laundry">Laundry</SelectItem>
                                                    <SelectItem value="Bar">Bar</SelectItem>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="0-Radius">0-Radius</SelectItem>
                                                    <SelectItem value="0-Radius-Accessories">0-Radius (Accessories)</SelectItem>
                                                    <SelectItem value="Custom">Custom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
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
                                </TableBody>
                            </Table>
                        </div>
                    )}

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

export { AddJobDialog };

