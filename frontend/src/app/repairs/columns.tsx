"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui"
import { Repair } from "../types/job"
import { EditRepairDialog } from "@/components/ui/EditRepairDialog";


export const columns = (fetchJobs: () => void): ColumnDef<Repair>[] => [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <Button variant="ghost" className="rounded-full" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <EditRepairDialog job={row.original} fetchJobs={fetchJobs} />,
        sortingFn: (rowA, rowB) => {
            // Get Job Number Values
            const jobA = (rowA.getValue("jobName") as string).split('-')[1];
            const jobB = (rowB.getValue("jobName") as string).split('-')[1];

            // Convert to numbers and sort ascending
            const numA = parseInt(jobA, 10);
            const numB = parseInt(jobB, 10);

            return numA - numB;
        }

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
        meta: { className: "text-center" }
    },
    {
        accessorKey: "installedBy",
        header: "Installed By",
        meta: { className: "text-center" }
    },
    {
        accessorKey: "changeOrder",
        header: "Change Order",
        cell: ({ row }) => {
            const value = row.getValue("changeOrder");
            return (
                <div>{value === true ? "Yes" : value === false ? "No" : ""}</div>
            );
        },
        meta: { className: "text-center" }
    },
]