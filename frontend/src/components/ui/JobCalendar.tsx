'use client';

import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function ReactCalendar() {
    const handleDateSelect = (selectInfo: DateSelectArg) => {
        console.log('Date selected:', selectInfo);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        console.log('Event clicked:', clickInfo.event);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                // left: 'prev today',
                left: 'title',
                center: '',
                // right: 'dayGridMonth,timeGridWeek,timeGridDay'
                right: 'prev today next'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={[
                { title: 'Event 1', date: '2025-08-05' },
                { title: 'Event 2', date: '2025-08-10' }
            ]}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="auto"
        />
    );
}