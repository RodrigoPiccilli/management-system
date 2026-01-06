'use client';

import FullCalendar from '@fullcalendar/react';
import { CalendarApi, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { LoadingPage } from '@/components/ui';
import api from '@/lib/apis';
import { invalidateCache } from '@/lib/cache';
import { useRef, useState } from 'react';


function parseEventId(eventId: string): { jobType: string; jobName: string } {
    const [jobType, ...jobNameParts] = eventId.split('-');
    return {
        jobType,
        jobName: jobNameParts.join('-'),
    };
}

const invalidateCaches = (jobType: string) => {

    if (jobType === "homeowners") {
        invalidateCache('homeowner_jobs_cache');
        invalidateCache('receivables_cache');
    } else if (jobType === "contractors") {
        invalidateCache('contractors_jobs_cache');
        invalidateCache('receivables_cache');
    } else if (jobType === "nvr") {
        invalidateCache('nvr_jobs_cache');
    } else if (jobType === "repairs") {
        invalidateCache('repairs_cache');
    }
};


export default function ReactCalendar() {

    const { events, loading, refetch } = useCalendarEvents();
    const calendarRef = useRef<FullCalendar | null>(null);

    if (loading) return <LoadingPage />

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        console.log('Date selected:', selectInfo);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        console.log('Event clicked:', clickInfo.event);
    };

    const handleDayClick = (clickInfo: DateClickArg) => {
        const calendarApi = calendarRef.current?.getApi() as CalendarApi;
        if (calendarApi) {
            calendarApi.changeView('dayGridDay', clickInfo.date);
        }
    };

    return (

        <div className="container mx-auto p-4">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev today next',
                    center: 'title',
                    right: 'dayGridMonth dayGridWeek'
                }}
                ref={calendarRef}
                dateClick={(info) => handleDayClick(info)}
                initialView='dayGridMonth'
                editable={true}
                eventDrop={async (info) => {
                    const { jobType, jobName } = parseEventId(info.event.id);
                    try {
                        await api.put(`/${jobType}/${jobName}`, {
                            installDate: new Date(info.event.startStr)
                        });
                        console.log('Install Date updated successfully');
                        invalidateCaches(jobType);

                    } catch (error) {
                        console.error('Failed to update install date:', error);
                        info.revert();
                    }
                }}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                height="auto"
                eventOrder={(a: any, b: any) => {

                    const installedByComparison = (a.extendedProps.installedBy || "").localeCompare(b.extendedProps.installedBy || "");
                    if (installedByComparison !== 0) return installedByComparison;

                    if (a.extendedProps.jobType === 'repairs' && b.extendedProps.jobType !== 'repairs') return -1;
                    if (b.extendedProps.jobType === 'repairs' && a.extendedProps.jobType !== 'repairs') return 1;

                    return a.title.localeCompare(b.title);
                }}

            />
        </div>
    );
}
