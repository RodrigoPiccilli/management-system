import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";

interface ExtraRow {
    id: number;
    description: string;
    amount: number;
}

export default function DynamicTable({ lionelFT2 = 0 }: { lionelFT2?: number }) {
    const [extraRows, setExtraRows] = useState<ExtraRow[]>([]);

    const addRow = () => {
        const newRow: ExtraRow = {
            id: Date.now(),
            description: '',
            amount: 0
        };
        setExtraRows([...extraRows, newRow]);
    };

    const removeRow = (id: number) => {
        setExtraRows(extraRows.filter(row => row.id !== id));
    };

    const updateRow = (id: number, field: keyof ExtraRow, value: string | number) => {
        setExtraRows(extraRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const calculateTotal = () => {
        const baseTotal = lionelFT2 * 6;
        const extraTotal = extraRows.reduce((sum, row) => sum + (parseFloat(row.amount.toString()) || 0), 0);
        return baseTotal + extraTotal;
    };

    return (
        <div className="flex flex-col m-5">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500 min-w-60">Total FT2</TableCell>
                        <TableCell className="text-center">{lionelFT2}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500 min-w-60">Rate</TableCell>
                        <TableCell className="text-center">$6</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500 min-w-60">Helpers</TableCell>
                        <TableCell>
                            <Input type="number" className="max-w-fit border-1 text-center pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                        </TableCell>
                    </TableRow>

                    {extraRows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="border-r-1 border-r-gray-500 min-w-60">
                                <Input
                                    type="text"
                                    value={row.description}
                                    onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                                    placeholder="Description"
                                    className="max-w-fit border-0 p-0"
                                />
                            </TableCell>
                            <TableCell className="relative">
                                <Input
                                    type="number"
                                    value={row.amount === 0 ? '' : row.amount} onChange={(e) => updateRow(row.id, 'amount', parseFloat(e.target.value) || 0)}
                                    placeholder="Amount"
                                    min={0}
                                    className="max-w-fit border-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                                {/* <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeRow(row.id)}
                                    className="rounded-4xl absolute top-0 right-0 w-4 h-4 p-0 text-xs"
                                >
                                    x */}
                                {/* </Button> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="text-right">${calculateTotal().toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <div className="mt-4 self-center">
                <Button onClick={addRow} variant="default">
                    + Add Extra
                </Button>
            </div>
        </div>
    );
}