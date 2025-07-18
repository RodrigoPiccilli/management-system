"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"


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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
        <span className="cursor-pointer hover:text-red-500">{row.getValue("id")}</span>
      ),
  },
  {
    accessorKey: "material",
    header: "Material",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
]