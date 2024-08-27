import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, EventProps, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '../Interface/Interface'; // Assurez-vous d'importer la bonne interface pour les événements
import { useTranslation } from 'react-i18next';
import { Container } from './Container';

interface CalendarEventProps {
    infosEvents: Event[];
}

interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    id: number;
    description: string;
}

const locales = {
    fr: fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
});

const CustomEvent: React.FC<EventProps<CalendarEvent>> = ({ event }) => {




    return (
        <div className="m-2 p-2 border rounded bg-secondary cursor-pointer">
            <p className="font-bold">{event.title}</p>
            {event.description && <p className="text-sm">{event.description}</p>}
        </div>
    );
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ infosEvents }) => {
    const { t } = useTranslation();
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);

    const events: CalendarEvent[] = infosEvents
        .filter((event) => event.title && event.id)  // Vérifie que les valeurs nécessaires ne sont pas undefined
        .map((event) => ({
            title: event.title!,
            start: new Date(event.startDate!),
            end: new Date(event.endDate || event.startDate!),
            id: event.id!,
            description: event.description || '', // Définit une valeur par défaut si la description est undefined
        }));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const today = new Date();
        const todayEvents = events.filter(event => event.start.toDateString() === today.toDateString());

        const upcomingEvents = events
            .filter(event => event.start > today)
            .sort((a, b) => a.start.getTime() - b.start.getTime());

        const nextEventDay = upcomingEvents.length > 0 ? upcomingEvents[0].start.toDateString() : null;

        if (isMobile) {
            const mobileFilteredEvents = [
                ...todayEvents,
                ...events.filter(event => event.start.toDateString() === nextEventDay)
            ];
            setFilteredEvents(mobileFilteredEvents);
        } else {
            setFilteredEvents(events);
        }

    }, [isMobile, infosEvents]);

    return (
        <Container className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <Calendar<CalendarEvent>
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'auto', width: '100%' }}
                    messages={{
                        next: t('next'),
                        previous: t('previous'),
                        today: t('today'),
                        month: t('month'),
                        week: t('week'),
                        day: t('day'),
                        agenda: t('agenda'),
                    }}
                    views={isMobile ? { day: true } : { week: true, day: true }}
                    defaultView={isMobile ? Views.DAY : Views.WEEK}
                    components={{
                        event: CustomEvent,
                        week: {
                            event: CustomEvent,
                        },
                        day: {
                            event: CustomEvent,
                        },
                    }}
                    step={30}
                    timeslots={2}
                    min={new Date(1970, 1, 1, 8, 0, 0)}
                    max={new Date(1970, 1, 1, 20, 0, 0)}
                    className="responsive-calendar h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
                />
            </div>
        </Container>

    );
};

export default CalendarEvent;
