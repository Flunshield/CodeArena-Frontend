import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, EventProps, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tournament } from '../Interface/Interface';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { useNavigate } from 'react-router-dom';

interface CalendarTournamentProps {
    infosTournament: Tournament[];
}

interface Event {
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

const CustomEvent: React.FC<EventProps<Event>> = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/tournament/${event.id}`);
    };

    return (
        <div onClick={handleClick} className="m-2 p-2 border rounded bg-secondary cursor-pointer">
            <p className="font-bold">{event.title}</p>
            {event.description && <p className="text-sm">{event.description}</p>}
        </div>
    );
};

const CalendarTournament: React.FC<CalendarTournamentProps> = ({ infosTournament }) => {
    const { t } = useTranslation();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);

    const events: Event[] = infosTournament.map((tournament) => ({
        title: tournament.title,
        start: new Date(tournament.startDate),
        end: new Date(tournament.endDate || tournament.startDate),
        id: tournament.id,
        description: tournament.description,
    }));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        // Nettoyage de l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const today = new Date();
        const todayEvents = events.filter(event => event.start.toDateString() === today.toDateString());

        // Trier les événements futurs par date de début
        const upcomingEvents = events
            .filter(event => event.start > today)
            .sort((a, b) => a.start.getTime() - b.start.getTime());

        // Trouver le jour du prochain événement s'il n'y en a pas aujourd'hui
        const nextEventDay = upcomingEvents.length > 0 ? upcomingEvents[0].start.toDateString() : null;

        // Si on est sur mobile, n'afficher que les événements d'aujourd'hui et le prochain jour d'événement
        if (isMobile) {
            const mobileFilteredEvents = [
                ...todayEvents,
                ...events.filter(event => event.start.toDateString() === nextEventDay)
            ];
            setFilteredEvents(mobileFilteredEvents);
        } else {
            setFilteredEvents(events);
        }

    }, [isMobile, infosTournament]);

    return (
        <Container className="bg-white p-4 rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <Calendar<Event>
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '70vh', width: '100%' }}
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
                    className="responsive-calendar h-[50vh] sm:h-[60vh] md:h-[70vh]"
                />
            </div>
        </Container>
    );
};

export default CalendarTournament;
