"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { differenceInDays } from 'date-fns';
import EditJobDialog from "@/components/ui/EditJobDialog";

export type Job = {
    id: string;
    jobName: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string;
    ft2?: number;
    address?: string;
    sink?: string;
    amount?: number;
    deposit?: boolean;
    final?: boolean;
};

export const columns = (fetchJobs: () => void): ColumnDef<Job>[] => [
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
        accessorKey: "deposit",
        header: "Deposit",
        cell: ({ row }) => {
            const value = row.getValue("deposit");
            if (value == true) return "Paid"
            if (value == false) return "Unpaid"
        },
    },
    {
        accessorKey: "final",
        header: "Final",
        cell: ({ row }) => {
            const value = row.getValue("final");
            if (value == true) return "Paid"
            if (value == false) return "Unpaid"
        },
    },
    {
        id: "status",
        header: "Status",
        accessorFn: (row) => {
            const deposit = row.deposit;
            const final = row.final;
            if (deposit && final) return "paid";

            if (!row.installDate) return "due";

            const date = new Date(row.installDate);
            const daysAgo = differenceInDays(new Date(), date);

            if (daysAgo >= 30) return "overdue";
            return "due";
        },
        cell: ({ row }) => {
            const deposit = row.getValue("deposit");
            const final = row.getValue("final");
            if (deposit == true && final == true) return <div className="text-emerald-500 font-bold">Paid In Full</div>

            const date = new Date(row.getValue("installDate"));
            const daysAgo = differenceInDays(new Date(), date);

            if (daysAgo >= 30) return <div className="text-red-600 font-bold"> Past Due ({daysAgo - 30} days)</div>

            if (daysAgo < 30) return <div className="text-emerald-600 font-bold">Due ({30 - daysAgo} days) </div>
        },
        sortingFn: (rowA, rowB) => {
            // Get status values
            const depositA = rowA.getValue("deposit");
            const finalA = rowA.getValue("final");
            const depositB = rowB.getValue("deposit");
            const finalB = rowB.getValue("final");

            // Calculate days ago for both rows
            const dateA = new Date(rowA.getValue("installDate"));
            const dateB = new Date(rowB.getValue("installDate"));
            const daysAgoA = differenceInDays(new Date(), dateA);
            const daysAgoB = differenceInDays(new Date(), dateB);

            // Determine status priority (0 = overdue, 1 = due, 2 = paid)
            let statusA = 2; // paid in full
            let statusB = 2;

            if (!(depositA && finalA)) {
                statusA = daysAgoA >= 30 ? 0 : 1; // 0 = overdue, 1 = due
            }

            if (!(depositB && finalB)) {
                statusB = daysAgoB >= 30 ? 0 : 1; // 0 = overdue, 1 = due
            }

            // Sort by status priority first
            if (statusA !== statusB) {
                return statusA - statusB; // overdue first, then due, then paid
            }

            // If same status, sort by days (most overdue first)
            if (statusA === 0) { // both overdue
                return daysAgoB - daysAgoA; // most overdue first
            }

            if (statusA === 1) { // both due
                return daysAgoA - daysAgoB; // least days until due first
            }

            return 0; // both paid
        }
    },
]