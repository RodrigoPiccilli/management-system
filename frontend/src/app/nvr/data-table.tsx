"use client"

import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddJobDialog from "./AddJob";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export type PaginationState = {
    pageIndex: number
    pageSize: number
  }
  
  export type PaginationTableState = {
    pagination: PaginationState
  }
  
  export type PaginationInitialTableState = {
    pagination?: Partial<PaginationState>
  }

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchJobs,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchJobs: () => void;
}) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10, // Changes the Number of Jobs Being Showed Per Page.
    })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
  })

  

  return (

    <div>
        {/* Filter Input */}
        <div className="flex items-center py-4 justify-between align-middle">
            <Input
            placeholder="Filter Jobs By Name"
            value={(table.getColumn("jobName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("jobName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            {/* <Button className="mx-2 min-w-1/20" onClick={fetchJobs}></Button> */}
            <div className="flex">
                <AddJobDialog fetchJobs={fetchJobs}/>
                <Button className="w-fit" onClick={fetchJobs}>Refresh</Button>
            </div>
        </div>

       {/* Table */}
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="divide-x divide-gray-200">
                    {headerGroup.headers.map((header) => {
                        const className = header.column.columnDef.meta && 'className' in header.column.columnDef.meta
                            ? (header.column.columnDef.meta as { className?: string }).className
                            : undefined;
                        return (
                        <TableHead key={header.id} className={className}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="divide-x divide-gray-200">
                        {row.getVisibleCells().map((cell) => {
                            // Safely access className only if meta and className exist
                            const className = cell.column.columnDef.meta && 'className' in cell.column.columnDef.meta
                                ? (cell.column.columnDef.meta as { className?: string }).className
                                : undefined;
                            return (
                                <TableCell key={cell.id} className={className}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Previous
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Next
            </Button>
      </div>
    </div>
  )
}