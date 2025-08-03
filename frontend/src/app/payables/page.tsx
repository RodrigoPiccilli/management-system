"use client"
import { Navigation } from "@/components/ui/Navigation";
import LoadingPage from "@/components/ui/loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { DatePicker } from "@/components/ui/DatePicker"
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { usePayables } from "@/hooks/usePayables";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { HomeownerJob, NVRJob } from "../types/job";
import { Input } from "@/components/ui/input";
import DynamicTable from "@/components/ui/DynamicTable";

export default function PayablesPage() {
    useAuthRedirect();

    const [selectedFrom, setSelectedFrom] = React.useState<Date | undefined>();
    const [selectedTo, setSelectedTo] = React.useState<Date | undefined>();
    const [searchDates, setSearchDates] = useState<{ from?: Date, to?: Date } | null>(null);
    const [lionelFT2, setLionelFT2] = useState(0);
    const [umbertoFT2, setUmbertoFT2] = useState(0);
    const [lionelTotal, setLionelTotal] = useState(0);
    const [umbertoTotal, setUmbertoTotal] = useState(0);

    const lionelRate = 6;
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

            <div className="flex gap-20 pb-10">
                
                <div className="data-table pl-17 flex flex-col gap-5">
                    <DataTable
                        columns={columns(fetchJobs)}
                        data={searchDates ? jobs.filter(job => job.installedBy === "Lionel") : []}
                        fetchJobs={fetchJobs}
                    />

                    <div className="self-center table-edges">
                        <DynamicTable totalFT2={lionelFT2} rate={lionelRate}/>
                    </div>

                </div>

                <div className="data-table pr-17 flex flex-col gap-5">
                    <DataTable
                        columns={columns(fetchJobs)}
                        data={searchDates ? jobs.filter(job => job.installedBy === "Umberto") : []}
                        fetchJobs={fetchJobs}
                    />

                    <div className="self-center table-edges">
                        <DynamicTable totalFT2={umbertoFT2} rate={umbertoRate}/>
                    </div>

                </div>
            </div>
        </div>
    )
}