"use client"

import LoadingPage from '@/components/ui/Loading';
import { Navigation } from '@/components/ui';
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

            <Calendar />
        </div>

    );
}