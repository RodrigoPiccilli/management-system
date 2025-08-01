"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NVRJob } from "../types/job"
import EditJobDialog from "@/components/ui/EditJobDialog"


export const columns = (fetchJobs: () => void): ColumnDef<NVRJob>[] => [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <Button variant="ghost" className="rounded-full" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <EditJobDialog apiEndpoint="/nvr" job={row.original} fetchJobs={fetchJobs} />,

    },
    {
        accessorKey: "areaCode",
        header: "Area Code",
        cell: info => info.getValue(),
        meta: { className: "text-center" }
    },
    {
        accessorKey: "model",
        header: "Model",
        meta: { className: "w-24 text-center" }
    },
    {
        accessorKey: "direction",
        header: "Direction",
        meta: { className: "max-w-24 text-center" }
    },
    {
        accessorKey: "stone",
        header: "Stone",
        meta: { className: "w-24 text-center" }

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
        meta: { className: "max-w-24 text-center" }
    },
    {
        accessorKey: "installDate",
        header: "Install Date",
        cell: ({ row }) => {
            const value = row.getValue("installDate");
            if (!value || typeof value !== "string") return "";
            const date = new Date(value);
            const formatted = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}-${date.getFullYear()}`;
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
        meta: { className: "w-20 text-center" }
    },
    {
        accessorKey: "community",
        header: "Community",
        meta: { className: "text-left" }
    },
    {
        accessorKey: "address",
        header: "Address",
        meta: { className: "text-left" }
    },
    {
        accessorKey: "sink",
        header: "Sink",
        meta: { className: "w-24 text-center" }
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
        meta: { className: "w-24 text-right" }
    },
    {
        accessorKey: "poNumber",
        header: "PO Number",
        meta: { className: "pr-5 text-right" }
    },
]