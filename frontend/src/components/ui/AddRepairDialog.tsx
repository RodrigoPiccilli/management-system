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

    useEffect(() => {
        setForm(initialForm);
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
            console.log("Repair added successfully!");
            setOpen(false);
            fetchJobs();
        } catch (error) {
            console.error("Failed to repair job:", error);
            setOpen(false);
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
                        <DialogDescription></DialogDescription>
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

