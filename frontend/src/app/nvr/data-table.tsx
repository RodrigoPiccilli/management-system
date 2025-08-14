"use client"

import * as React from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    FilterFn
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
    AddJobDialog
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
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    // NEW — single filter state
    const [globalFilter, setGlobalFilter] = React.useState(() => {
        const saved = localStorage.getItem("globalJobFilter");
        return saved || "";
    });

    // Custom filter for jobName OR community
    const globalFilterFn: FilterFn<any> = (row, columnIds, filterValue) => {
        if (!filterValue) return true;
        const search = String(filterValue).toLowerCase();
        return (
            String(row.getValue("jobName") || "").toLowerCase().includes(search) ||
            String(row.getValue("community") || "").toLowerCase().includes(search)
        );
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn, // attach custom fn
    });

    React.useEffect(() => {
        localStorage.setItem("globalJobFilter", globalFilter);
    }, [globalFilter]);

    return (
        <div>
            {/* Filter Input */}
            <div className="data-actions">
                <Input
                    placeholder="Filter by Name or Community"
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="filter-input"
                />
                <div className="flex">
                    <AddJobDialog
                        apiEndpoint="/nvr"
                        initialForm={{
                            jobName: "",
                            areaCode: null,
                            model: null,
                            direction: null,
                            stone: null,
                            backsplash: null,
                            installDate: null,
                            installedBy: null,
                            ft2: null,
                            community: null,
                            address: null,
                            sink: null,
                            amount: null,
                            poNumber: null,
                        }}
                        title="Add NVR Job"
                        fetchJobs={fetchJobs}
                    />
                    <Button
                        className="w-fit bg-slate-600 text-white hover:bg-slate-700 cursor-pointer"
                        onClick={fetchJobs}
                    >
                        Refresh
                    </Button>
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="divide-x divide-slate-200 even:bg-slate-50 odd:bg-white hover:bg-indigo-50">
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
