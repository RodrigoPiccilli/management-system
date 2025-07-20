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
import { Label } from "@/components/ui/label"

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

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "jobName",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>

        )
      },
      cell: ({ row }) => (
        // <span className="cursor-pointer hover:text-red-500">{row.getValue("id")}</span>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="ghost">{row.getValue("jobName")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Job</DialogTitle>
                    </DialogHeader>
                    <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableHead>Job Name</TableHead>
                                        <TableCell><Input placeholder="Job Name"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Area Code</TableHead>
                                        <TableCell><Input placeholder="Area Code"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Model</TableHead>
                                        <TableCell><Input placeholder="Model"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Direction</TableHead>
                                        <TableCell><Input placeholder="Direction"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Stone</TableHead>
                                        <TableCell><Input placeholder="Stone Type"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Backsplash</TableHead>
                                        <TableCell>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Backsplash"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="yes">Yes</SelectItem>
                                                    <SelectItem value="no">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Install Date</TableHead>
                                        <TableCell><Input type="date"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Ft<sup>2</sup></TableHead>
                                        <TableCell><Input placeholder="Ft²"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Community</TableHead>
                                        <TableCell><Input placeholder="Community"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Address</TableHead>
                                        <TableCell><Input placeholder="Address"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Sink</TableHead>
                                        <TableCell><Input placeholder="Sink Type"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>Amount ($)</TableHead>
                                        <TableCell><Input placeholder="Amount ($)"/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead>PO Number</TableHead>
                                        <TableCell><Input placeholder="PO Number"/></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
      ),
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
        const formatted = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()}`;
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