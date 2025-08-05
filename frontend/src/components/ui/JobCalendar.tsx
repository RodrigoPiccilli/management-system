'use client';

import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import LoadingPage from './Loading';
import api from '@/lib/apis';

function parseEventId(eventId: string): { jobType: string; jobName: string } {
    const [jobType, ...jobNameParts] = eventId.split('-');
    return {
        jobType,
        jobName: jobNameParts.join('-'),
    };
}

export default function ReactCalendar() {
    const { events, loading, refetch } = useCalendarEvents();

    if (loading) return <LoadingPage />

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        console.log('Date selected:', selectInfo);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        console.log('Event clicked:', clickInfo.event);
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
                initialView='dayGridMonth'
                editable={true}
                eventDrop={async (info) => {
                    const { jobType, jobName } = parseEventId(info.event.id);

                    console.log(`/${jobType}/${jobName}`);

                    try {
                        await api.put(`/${jobType}/${jobName}`, {
                            installDate: new Date(info.event.startStr)
                        });
                        console.log('Install Date updated successfully');
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
            />
        </div>
    );
}