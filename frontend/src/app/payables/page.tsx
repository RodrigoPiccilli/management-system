"use client"
import { Navigation, DatePicker, Button, LoadingPage, DynamicTable } from "@/components/ui";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { usePayables } from "@/hooks/usePayables";
import React, { useEffect, useState } from "react";

/**
 * PayablesPage
 *
 * Page component for managing and printing payables for Lionel and Umberto.
 *
 * Features:
 * - Enforces authentication redirect via `useAuthRedirect()`.
 * - Allows filtering jobs by a date range (From / To).
 * - Fetches jobs using `usePayables` hook with date range filtering.
 * - Separates jobs by installer (Lionel vs Umberto) and calculates total FT² per installer.
 * - Displays two DataTables (one per installer) for inline editing and inspection.
 * - Displays a DynamicTable per installer that calculates pay based on total FT² and rate.
 * - Print-friendly layout:
 *   - Hides navigation, buttons, and headers not needed for printing.
 *   - Shows simplified headers and smaller gaps.
 * - Includes a "Print" button that triggers `window.print()`.
 *
 * State:
 * - `selectedFrom` / `selectedTo`: currently selected date range for filtering.
 * - `searchDates`: stored date range after clicking Apply.
 * - `lionelFT2` / `umbertoFT2`: total FT² for each installer (used in DynamicTable).
 *
 * Handlers:
 * - `handleFrom` / `handleTo`: update selected dates.
 * - `handleSearch`: apply date filter to trigger fetching jobs.
 * - `calculateTotalFT2`: sum FT² of filtered jobs.
 */
export default function PayablesPage() {
    useAuthRedirect();

    const [selectedFrom, setSelectedFrom] = React.useState<Date | undefined>();
    const [selectedTo, setSelectedTo] = React.useState<Date | undefined>();
    const [searchDates, setSearchDates] = useState<{ from?: Date, to?: Date } | null>(null);
    const [lionelFT2, setLionelFT2] = useState(0);
    const [umbertoFT2, setUmbertoFT2] = useState(0);

    const lionelRate = 5;
    const umbertoRate = 5;

    const handleFrom = (date: Date | undefined) => {
        setSelectedFrom(date)
        console.log("Selected From Date:", date)
    }

    const handleTo = (date: Date | undefined) => {
        setSelectedTo(date)
        console.log("Selected To Date:", date)
    }

    const handleSearch = () => {
        if (selectedFrom && selectedTo) {
            setSearchDates({ from: selectedFrom, to: selectedTo });
        }
    }

    const calculateTotalFT2 = (jobs: any[]) => {
        let total = 0;

        for (const job of jobs) {
            if (typeof job.ft2 === "number") {
                total += job.ft2;
            }
        }

        return total;
    }

    const { jobs, loading, fetchJobs } = usePayables({
        dateFrom: searchDates?.from,
        dateTo: searchDates?.to,
        enabled: searchDates !== null
    });

    useEffect(() => {
        if (jobs && jobs.length > 0) {
            const lionelJobs = jobs.filter(job => job.installedBy === "Lionel");
            const umbertoJobs = jobs.filter(job => job.installedBy === "Umberto");
            setLionelFT2(calculateTotalFT2(lionelJobs));
            setUmbertoFT2(calculateTotalFT2(umbertoJobs));
        } else {
            setLionelFT2(0);
            setUmbertoFT2(0);
        }
    }, [jobs]);

    if (loading) return <LoadingPage />

    return (
        <div className="outer-div-template">

            <div className="print:hidden">
                <Navigation activeTab="payables" />
            </div>

            <div className="container mx-auto px-4 print:max-w-none print:px-0 print:mx-0">
                <header className="page-header print:hidden">
                    <h1 className="page-title">Payables</h1>
                </header>

                <div className="flex gap-10 py-3 print:hidden">
                    <div className="flex items-center justify-center gap-2">
                        <h3 className="font-bold">From: </h3>
                        <DatePicker onDateChange={handleFrom} value={selectedFrom} />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <h3 className="font-bold">To: </h3>
                        <DatePicker onDateChange={handleTo} value={selectedTo} />
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleSearch}
                        disabled={!selectedFrom || !selectedTo}
                    >
                        Apply
                    </Button>
                </div>

                <div className="flex gap-20 pb-10 print:p-0 print:m-0">

                    <div className="data-table flex flex-col gap-5 print:gap-0.5">

                        <h1 className="text-base text-center hidden print:block">Lionel <span className="text-xs">({selectedFrom?.toLocaleDateString()}-{selectedTo?.toLocaleDateString()})</span></h1>
                        <h1 className="text-2xl print:hidden text-slate-900">Lionel's Jobs</h1>
                        <DataTable
                            columns={columns(fetchJobs)}
                            data={searchDates ? jobs.filter(job => job.installedBy === "Lionel") : []}
                            fetchJobs={fetchJobs}
                        />

                        <div className="self-center table-edges">
                            <DynamicTable totalFT2={lionelFT2} rate={lionelRate} />
                        </div>

                    </div>

                    <div className="data-table flex flex-col gap-5 print:gap-0.5">

                        <h1 className="text-base text-center text-nowrap hidden print:block">Umberto <span className="text-xs">({selectedFrom?.toLocaleDateString()}-{selectedTo?.toLocaleDateString()})</span></h1>
                        <h1 className="text-2xl text-slate-900 print:hidden">Umberto's Jobs</h1>
                        <DataTable
                            columns={columns(fetchJobs)}
                            data={searchDates ? jobs.filter(job => job.installedBy === "Umberto") : []}
                            fetchJobs={fetchJobs}
                        />

                        <div className="self-center table-edges">
                            <DynamicTable totalFT2={umbertoFT2} rate={umbertoRate} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center px-5 py-15">
                <Button variant="primary" disabled={!selectedFrom || !selectedTo} onClick={() => window.print()} className="print:hidden px-14 py-10 text-4xl shadow-2xl text-slate-50">Print</Button>
            </div>

        </div>
    )
}
