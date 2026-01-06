"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button, EditPayableDialog } from "@/components/ui"
import { NVRJob, HomeownerJob, ContractorJob } from "../types/job"

/**
 * PayablesTable Columns
 *
 * Column definitions for displaying jobs (NVR, Homeowner, Contractor) in a table with payable management.
 *
 * Features:
 * - Inline editing of payables via EditPayableDialog.
 * - Prints job name as text while hiding interactive elements.
 * - Formats installDate as MM-DD-YYYY and hides it when printing.
 * - Formats ft2 values to 2 decimal places.
 * - Uses `meta.className` for alignment and print-specific styles.
 *
 * Props:
 * - fetchJobs (function): Callback to refresh the job list after edits.
 *
 * Notes:
 * - Dynamically determines API endpoint based on job type:
 *   - NVR jobs: "/nvr"
 *   - Contractor jobs: "/contractors"
 *   - Homeowner jobs: "/homeowners"
 * - Uses responsive and print-friendly styling with Tailwind classes.
 */
export const columns = (fetchJobs: () => void): ColumnDef<NVRJob | HomeownerJob | ContractorJob>[] => [
    {
        accessorKey: "jobName",
        header: ({ column }) => (
            <Button variant="ghost" className="rounded-full print:text-xs">
                Job Name
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                <h1 className="hidden text-xs p-2 print:block">{row.original.jobName}</h1>
                <div className="print:hidden">
                    <EditPayableDialog job={row.original} fetchJobs={fetchJobs} apiEndpoint={"community" in row.original ? "/nvr" : "contractor" in row.original ? "/contractors" : "/homeowners"} />
                </div>
            </div>
        ),
        meta: { className: "text-left max-w-12 p-2 print:p-0" }

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
        meta: { className: "text-center max-w-12 print:hidden" }
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
        meta: { className: "max-w-12 text-center print:text-xs print:p-0" }
    },
]