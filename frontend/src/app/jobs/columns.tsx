"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState, useEffect } from "react"

import ViewJobDialog from "./EditJob"

export type Job = {
    id: string;
    jobName: string;
    areaCode?: string;
    model?: string;
    direction?: string;
    stone?: string;
    backsplash?: boolean;
    installDate?: string; 
    ft2?: number;
    community?: string;
    address?: string;
    sink?: string;
    amount?: number;
    poNumber?: string;
};

export const columns = (fetchJobs: () => void): ColumnDef<Job>[] => [
  {
    accessorKey: "jobName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Job Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <ViewJobDialog job={row.original} fetchJobs={fetchJobs} />
  },
  {
    accessorKey: "areaCode",
    header: "Area Code",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    accessorKey: "stone",
    header: "Stone",
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
  },
  {
    accessorKey: "community",
    header: "Community",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "sink",
    header: "Sink",
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
  },
  {
    accessorKey: "poNumber",
    header: "PO Number",
  },
]