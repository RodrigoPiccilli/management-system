"use client"
import { Navigation } from "@/components/ui/Navigation";
import LoadingPage from "@/components/ui/loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { DatePicker } from "@/components/ui/DatePicker"
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { usePayables } from "@/hooks/usePayables";
import React, { useState } from "react";

export default function PayablesPage() {
    useAuthRedirect();

    const [selectedFrom, setSelectedFrom] = React.useState<Date | undefined>();
    const [selectedTo, setSelectedTo] = React.useState<Date | undefined>();
    const [searchDates, setSearchDates] = useState<{ from?: Date, to?: Date } | null>(null);

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

    const { jobs, loading, fetchJobs } = usePayables({
        dateFrom: searchDates?.from,
        dateTo: searchDates?.to,
        enabled: searchDates !== null
    });

    if (loading) return <LoadingPage />

    return (
        <div className="outer-div-template">
            <Navigation activeTab="payables" />
            <header className="page-header">
                <h1 className="page-title">Payables</h1>
            </header>

            <div className="flex gap-10 justify-center">
                <div className="flex items-center justify-center gap-2">
                    <h3 className="font-bold">From: </h3>
                    <DatePicker onDateChange={handleFrom} value={selectedFrom} />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <h3 className="font-bold">To: </h3>
                    <DatePicker onDateChange={handleTo} value={selectedTo} />
                </div>
            </div>

            <div className="flex gap-10 justify-center mt-5">
                <Button
                    variant="default"
                    onClick={handleSearch}
                    disabled={!selectedFrom || !selectedTo}
                >
                    Search
                </Button>
            </div>

            <div className="flex gap-20">
                <div className="data-table pl-17">
                    <DataTable
                        columns={columns(fetchJobs)}
                        data={searchDates ? jobs.filter(job => job.installedBy === "Lionel") : []}
                        fetchJobs={fetchJobs}
                    />
                </div>

                <div className="data-table pr-17">
                    <DataTable
                        columns={columns(fetchJobs)}
                        data={searchDates ? jobs.filter(job => job.installedBy === "Umberto") : []}
                        fetchJobs={fetchJobs}
                    />
                </div>
            </div>

        </div>
    )
}