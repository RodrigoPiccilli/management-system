"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button, EditJobDialog } from "@/components/ui"
import { HomeownerJob } from "../types/job"

export const columns = (fetchJobs: () => void): ColumnDef<HomeownerJob>[] => [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <Button variant="ghost" className="rounded-full" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <EditJobDialog apiEndpoint="/homeowners" job={row.original} fetchJobs={fetchJobs} />,

    },
    {
        accessorKey: "stone",
        header: "Stone",
        meta: { className: "text-center" }

    },

    {
        accessorKey: "backsplash",
        header: "Backsplash",
        cell: ({ row }) => {
            const value = row.getValue("backsplash");
            return (
                <div>{value === true ? "Yes" : value === false ? "No" : ""}</div>
            );
        },
        meta: { className: "text-center" }
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
        accessorKey: "ft2",
        header: "FT²",
        cell: ({ row }) => {
            const value = row.getValue("ft2");
            if (typeof value === "number") {
                return value.toFixed(2);
            }
            return "";
        },
        meta: { className: "text-center" }
    },
    {
        accessorKey: "address",
        header: "Address",
        meta: { className: "text-center" }
    },
    {
        accessorKey: "sink",
        header: "Sink",
        meta: { className: "text-center" }
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const value = row.getValue("amount");
            if (typeof value === "number") {
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(value);
            }
        },
        meta: { className: "text-center" }
    },
]