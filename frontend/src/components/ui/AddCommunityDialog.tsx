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
    Input,
} from '@/components/ui';
import api from '@/lib/apis';
import { invalidateCache } from '@/lib/cache';
import { FormEvent, useEffect, useState } from 'react';

const AddCommunityDialog = () => {

    const initialForm = {
        prefix: "",
            community: "",
            areaCode: "",
    };

    const [form, setForm] = useState(initialForm);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        setForm(initialForm);
        setSuccess("");
        setError("");
    }, [open]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [field]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {

            await api.post('/prefix-mappings', form);
            setError("");
            setSuccess(`${form.prefix} Added!`);
            setForm(initialForm);

        } catch (message: any) {

            console.error("Failed to add community:", message);
            setSuccess("");

            const { status, data } = message.response;

            if (status === 409 && data.error === 'DUPLICATE_MAPPING') {
                setError(data.message);
            } else if (status === 400 && data.error === "MISSING_ATTRIBUTE") {
                setError(data.message);
            }

            setOpen(true);
        }



    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="mx-2 max-w-fit" onClick={() => setOpen(true)}>View</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-fit">
                    <DialogHeader>
                        <DialogTitle>Add Community</DialogTitle>
                        <DialogDescription>
                            {error && (
                                <span className="text-base text-red-500 font-semibold">{error}</span>
                            )}

                            {success && (
                                <span className="text-base text-emerald-500 font-semibold">{success}</span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col gap-[2rem]">
                        <Table>
                            <TableBody>
                                {"prefix" in form && (
                                    <TableRow>
                                        <TableHead>Prefix</TableHead>
                                        <TableCell>
                                            <Input
                                                className="border-slate-300 focus:border-indigo-500"
                                                value={form.prefix || ""}
                                                placeholder="Ex: WD"
                                                onChange={handleChange("prefix")} />
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
                                                placeholder="Ex: Wren Woods"
                                                onChange={handleChange("community")} />
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
                                                placeholder="Ex: GVS"
                                                onChange={handleChange("areaCode")} />
                                        </TableCell>
                                    </TableRow>
                                )}
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

export { AddCommunityDialog };