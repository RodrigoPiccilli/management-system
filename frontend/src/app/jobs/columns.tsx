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
    id: string
    material: string
    direction: "per plan" | "reverse"
    model: string
}

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Job Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>

            // {/* <div className="flex flex-row items-center cursor-pointer"
            // // variant="ghost"
            // >
            // <h3 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Job Name</h3>
            // <ArrowUpDown className="ml-2 h-4 w-4" />
            // </div> */}
        )
      },
      cell: ({ row }) => (
        // <span className="cursor-pointer hover:text-red-500">{row.getValue("id")}</span>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="ghost">{row.getValue("id")}</Button>
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

      //HERE! WE WANT TO MAKE THIS INTO A CLICKABLE DIALOG THAT ALLOWS YOU TO EDIT THE CONTENT!
  },
  {
    accessorKey: "area-code",
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
  },
  {
    accessorKey: "install-date",
    header: "Install Date",
  },
  {
    accessorKey: "ft",
    header: "FT²",
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
  },
  {
    accessorKey: "po-number",
    header: "PO Number",
  },
]