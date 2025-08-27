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
} from "@/components/ui"

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

/**
 * PayablesDataTable<TData, TValue>
 *
 * A reusable table component built on TanStack React Table for displaying jobs (NVR, Homeowner, Contractor) in the payables context.
 *
 * Features:
 * - Client-side pagination (default pageSize: 40 for larger tables).
 * - Sorting support via clickable column headers.
 * - Column filtering support (optional, not currently exposed).
 * - Inline row rendering via flexRender (supports custom cell components like EditPayableDialog).
 * - Tailwind-based styling for hover, stripe, and print-friendly layouts.
 * - Handles empty state with a "No results" message.
 *
 * Props:
 * - columns: ColumnDef<TData, TValue>[] => table column definitions.
 * - data: TData[] => array of job objects to render.
 * - fetchJobs: () => void => callback to refresh job list after edits.
 *
 * Notes:
 * - ColumnDef.meta can include a `className` for cell alignment and styling.
 * - Pagination, sorting, and filtering states are managed internally via React state hooks.
 * - Designed for payables table usage where interactivity (editing) is needed.
 */
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
        pageSize: 40, // Changes the Number of Jobs Being Showed Per Page.
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
            {/* Table */}
            <div className='table-edges'>
                <Table>
                    <TableHeader className="bg-slate-200 text-slate-800">
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
                    <TableBody >
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="divide-x divide-slate-200 even:bg-slate-50 odd:bg-white hover:bg-indigo-50" >
                                    {row.getVisibleCells().map((cell) => {
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


        </div>
    )
}