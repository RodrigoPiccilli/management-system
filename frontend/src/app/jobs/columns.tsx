"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Job = {
    id: string
    material: string
    direction: "per plan" | "reverse"
    model: string
}

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: "Name",
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