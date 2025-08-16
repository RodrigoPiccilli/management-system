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
    Textarea,
} from '@/components/ui';
import { useEffect, useState } from "react"
import api from "@/lib/apis";

type RepairForm = Record<string, any>;

interface AddRepairDialogProps {
    initialForm: RepairForm;
    fetchJobs: () => void;
}

const AddRepairDialog = ({ initialForm, fetchJobs }: AddRepairDialogProps) => {

    const [form, setForm] = useState<RepairForm>(initialForm);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setForm(initialForm);
        setError("");
    }, [open, initialForm]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            await api.post("/repairs", dataToSend);
            setError("");
            console.log("Repair added successfully!");
            setOpen(false);
            fetchJobs();
        } catch (error: any) {

            console.error("Failed to repair job:", error);

            const { status, data } = error.response;

            if (status === 409 && data.error === 'DUPLICATE_JOB_NAME') {
                setError("Duplicate Repair Name");
            } else if (status === 400 && data.error === "MISSING_JOB_NAME") {
                setError("Repair Name Required");
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
                        <DialogTitle><span className="text-emerald-600">Add</span> Repair</DialogTitle>
                        <DialogDescription>
                            {error && (
                                <span className="text-base text-red-500 font-semibold">{error}</span>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-[2rem]">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableHead>Repair Name</TableHead>
                                    <TableCell>
                                        <Input
                                            className="border-slate-300 focus:border-indigo-500"
                                            value={form.jobName || ""}
                                            placeholder="Repair Name"
                                            onChange={handleChange("jobName")} />
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
                                <TableRow>
                                    <TableHead>Change Order</TableHead>
                                    <TableCell>
                                        <Select
                                            value={form.changeOrder === true ? "yes" : form.changeOrder === false ? "no" : ""}
                                            onValueChange={value =>
                                                setForm({ ...form, changeOrder: value === "yes" ? true : value === "no" ? false : undefined })
                                            }>
                                            <SelectTrigger className="w-full border-slate-300 focus:border-indigo-500">
                                                <SelectValue placeholder="Change Order" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Notes</TableHead>
                                    <TableCell>
                                        <Textarea
                                            placeholder='Notes'
                                            value={form.notes != null ? form.notes : ""}
                                            onChange={handleChange("notes")}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

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

export { AddRepairDialog };

