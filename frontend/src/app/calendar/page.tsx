"use client"

import LoadingPage from '@/components/ui/loading';
import { Navigation } from '@/components/ui/Navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/ui/JobCalendar'), {
    ssr: false,
    loading: () => <LoadingPage />
});

export default function CalendarPage() {

    useAuthRedirect();

    return (

        <div className="outer-div-template">

            < Navigation activeTab="calendar" />

            <header className="page-header">
                <h1 className="page-title">Calendar</h1>
            </header>

            <div className="container mx-auto p-4">
                <Calendar />
            </div>
        </div>

    );
}