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
    AddCommunityDialog,
} from '@/components/ui';
import api from '@/lib/apis';
import { invalidateCache } from '@/lib/cache';
import { FormEvent, useEffect, useState } from 'react';

const SettingsDialog = () => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, [open]);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="mx-2 max-w-fit" onClick={() => setOpen(true)}>Settings</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        {message && (
                            <span className="text-base text-red-500 font-semibold">{message}</span>
                        )}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-[2rem]">
                    <Table>
                        <TableBody>
                            {/* {"prefix" in form && (
                                    <TableRow>
                                        <TableHead>Prefix</TableHead>
                                        <TableCell>
                                            <Input
                                                className="border-slate-300 focus:border-indigo-500"
                                                value={form.prefix || ""}
                                                placeholder="Prefix"
                                                onChange={handleChange("prefix")} />
                                        </TableCell>
                                    </TableRow>
                                )} */}
                            {/* {"community" in form && (
                                    <TableRow>
                                        <TableHead>Community</TableHead>
                                        <TableCell>
                                            <Input
                                                className="border-slate-300 focus:border-indigo-500"
                                                value={form.community || ""}
                                                placeholder="Community"
                                                onChange={handleChange("community")} />
                                        </TableCell>
                                    </TableRow>
                                )} */}
                            <TableRow>
                                <TableHead>Add Community</TableHead>
                                <TableCell>
                                    <AddCommunityDialog />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                </div>

                <DialogFooter>
                    <DialogClose asChild>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog >
    )

}

export { SettingsDialog };