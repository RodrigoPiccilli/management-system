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
    SelectItem,
    Textarea
} from "@/components/ui";
import api from "@/lib/apis"
import { Repair } from "@/app/types/job";
import { invalidateCache } from "@/lib/cache";

interface EditRepairDialogProps {
    job: Repair
    fetchJobs: () => void;
}

const EditRepairDialog = ({ job, fetchJobs }: EditRepairDialogProps) => {

    const [form, setForm] = useState({ ...job });
    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (open) setForm(job);

    }, [open, job]);

    const handleChange = <T extends keyof (Repair)>(field: T) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm({ ...form, [field]: e.target.value });
        };

    const handleDelete = async () => {
        try {
            await api.delete(`/repairs/${job.jobName}`)
            fetchJobs();
            setOpen(false);
            console.log("Repair deleted successfully!");

            invalidateCache('repairs_cache');

        } catch (error) {
            console.error("Failed to delete repair: ", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.put((`/repairs/${form.jobName}`), form);
            fetchJobs();
            setOpen(false);
            console.log("Repair updated successfully!");

            invalidateCache('repairs_cache');

        } catch (error) {
            console.error("Failed to update repair:", error);
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
                                {"notes" in form && (
                                    <TableRow>
                                        <TableHead>Notes</TableHead>
                                        <TableCell>
                                            <Textarea
                                                placeholder='Notes'
                                                value={form.notes != null ? form.notes : ""}
                                                onChange={handleChange("notes")}
                                                className="border-slate-300 focus:border-indigo-500"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

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






export { EditRepairDialog };



