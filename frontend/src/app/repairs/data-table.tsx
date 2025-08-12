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
    Button,
    Input,
    AddRepairDialog
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
    const FILTER_KEY = "jobNameFilter";


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

    const [filterInput, setFilterInput] = React.useState(() => {
        const savedFilter = localStorage.getItem(FILTER_KEY);
        return savedFilter || "";
    });

    React.useEffect(() => {
        localStorage.setItem(FILTER_KEY, filterInput);
        table.getColumn("jobName")?.setFilterValue(filterInput);
    }, [filterInput]);

    return (

        <div>
            {/* Filter Input */}
            <div className="data-actions">
                <Input
                    placeholder="Filter Repairs By Name"
                    value={(table.getColumn("jobName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;
                        setFilterInput(value);
                        table.getColumn("jobName")?.setFilterValue(value);
                    }}
                    className="filter-input"
                />
                <div className="flex">
                    <AddRepairDialog
                        initialForm={{
                            jobName: "",
                            installDate: null,
                            installedBy: null,
                            address: null,
                            notes: null,
                        }}
                        fetchJobs={fetchJobs}
                    />
                    <Button className="w-fit bg-slate-600 text-white hover:bg-slate-700 cursor-pointer" onClick={fetchJobs}>Refresh</Button>
                </div>
            </div>

            {/* Table */}
            <div className="table-edges">
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

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    className="bg-slate-600 text-white hover:bg-slate-700 cursor-pointer"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
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