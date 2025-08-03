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

export default function DynamicTable({ totalFT2, rate }: { totalFT2: number, rate: number }) {
    const [helpersTotal, setHelpersTotal] = useState(0);
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
        const baseTotal = totalFT2 * rate;
        const extraTotal = extraRows.reduce((sum, row) => sum + (parseFloat(row.amount.toString()) || 0), 0);
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(baseTotal + extraTotal + helpersTotal)
    }

    return (
        <div className="flex flex-col m-5">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500 min-w-50 print:min-w-0">Total FT2</TableCell>
                        <TableCell className="text-center">{totalFT2.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500">Rate</TableCell>
                        <TableCell className="text-center">{new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(rate)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500">Base</TableCell>
                        <TableCell className="text-center">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(totalFT2 * rate)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border-r-1 border-r-gray-500 ">Helpers</TableCell>
                        <TableCell className="">
                            <Input
                                type="number"
                                className="max-w-fit border-1 text-center no-step print:text-sm"
                                placeholder="$"
                                onChange={(e) => setHelpersTotal(Number(e.target.value))}
                            />
                        </TableCell>
                    </TableRow>
                    {extraRows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="border-r-1 border-r-gray-500">
                                <Input
                                    type="text"
                                    value={row.description}
                                    onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                                    placeholder="Description"
                                    className="border-0 p-0 print:text-sm"
                                />
                            </TableCell>
                            <TableCell className="relative">
                                <Input
                                    type="number"
                                    value={row.amount === 0 ? '' : row.amount} onChange={(e) => updateRow(row.id, 'amount', parseFloat(e.target.value) || 0)}
                                    placeholder="$"
                                    min={0}
                                    className="border-1 text-center no-step print:text-sm" />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeRow(row.id)}
                                    className="rounded-4xl absolute top-0 right-0 w-4 h-4 p-0 text-xs cursor-pointer print:hidden"
                                >
                                    x
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="text-right">{calculateTotal()}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <div className="mt-4 self-center print:hidden">
                <Button onClick={addRow} variant="primary">
                    + Add Extra
                </Button>
            </div>
        </div>
    );
}