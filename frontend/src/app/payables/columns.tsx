"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NVRJob } from "../types/job"
import { HomeownerJob } from "../types/job"
import EditPayableDialog from "@/components/ui/EditPayableDialog"


export const columns = (fetchJobs: () => void): ColumnDef<NVRJob | HomeownerJob>[] => [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <Button variant="ghost" className="rounded-full" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <EditPayableDialog job={row.original} fetchJobs={fetchJobs} nvr={"community" in row.original}/>
        ),
        meta: { className: "text-left max-w-12 p-2" }

    },
    {
        accessorKey: "installDate",
        header: "Install Date",
        cell: ({ row }) => {
            const value = row.getValue("installDate");
            if (!value || typeof value !== "string") return "";
            const [year, month, day] = value.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

            const formatted = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()}`;
            return <span>{formatted}</span>;
        },
        meta: { className: "text-center max-w-12" }
    },
    {
        accessorKey: "installedBy",
        header: "Installed By",
        meta: { className: "max-w-12 text-center" }
    },
    {
        accessorKey: "ft2",
        header: "FT²",
        cell: ({ row }) => {
            const value = row.getValue("ft2");
            if (typeof value === "number") {
                return value.toFixed(2);
            }
            return "";
        },
        meta: { className: "max-w-12 text-center" }
    },
]