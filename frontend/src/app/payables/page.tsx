"use client"

import { Navigation } from "@/components/ui/Navigation";
import LoadingPage from "@/components/ui/loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function PayablesPage() {

    useAuthRedirect();

    // const { jobs, loading, fetchJobs } = useNVRJobs();

    // if (loading) return <LoadingPage />

    return (
        <div className="outer-div-template">

            < Navigation activeTab="payables" />

            <header className="page-header">
                <h1 className="page-title">Payables</h1>
            </header>

            

        </div>
    )
}
