import { useEffect, useState } from "react";
import {
    Dialog,
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
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem

} from "@/components/ui";
import api from "@/lib/apis"
import { HomeownerJob, NVRJob } from "@/app/types/job";


interface EditPayableDialogProps {
    nvr: boolean;
    job: NVRJob | HomeownerJob;
    fetchJobs: () => void;
}

const EditPayableDialog = ({ nvr, job, fetchJobs }: EditPayableDialogProps) => {

    const [form, setForm] = useState({ ...job });
    const [open, setOpen] = useState(false);

    const apiEndpoint = nvr ? "/nvr" : "/homeowners";

    useEffect(() => {

        if (open) setForm(job);

    }, [open, job]);

    const handleChange = <T extends keyof (NVRJob & HomeownerJob)>(field: T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: e.target.value });
        };

    const handleDelete = async () => {
        try {
            await api.delete(`${apiEndpoint}/${job.jobName}`)
            fetchJobs();
            setOpen(false);
            console.log("Job deleted successfully!");
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
        } catch (error) {
            console.error("Failed to update job:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">{job.jobName}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle><span className="text-indigo-500">Edit</span> {job.jobName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
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
                        </TableBody>
                    </Table>

                    <DialogFooter className="mt-5">

                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" >Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}






export { EditPayableDialog };



