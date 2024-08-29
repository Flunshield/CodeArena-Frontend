import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, EventProps, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, Locale } from 'date-fns'; // Import `Locale` from date-fns
import { fr, enUS} from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '../Interface/Interface';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { useNavigate } from 'react-router-dom';

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

type SupportedLanguages = 'fr' | 'en';

const locales: Record<SupportedLanguages, Locale> = {
    fr: fr,
    en: enUS,
};

const CalendarEvent: React.FC<CalendarEventProps> = ({ infosEvents }) => {
    const { t, i18n } = useTranslation();
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);

    // Déterminez la langue actuelle et assurez-vous qu'elle est une langue supportée
    const currentLang = i18n.language as SupportedLanguages;

    // Configurez le localisateur en fonction de la langue actuelle
    const localizer = dateFnsLocalizer({
        format: (date: Date, formatStr: string) =>
            format(date, formatStr, { locale: locales[currentLang] || enUS }), // Utilisation correcte des types
        parse: (dateString: string, formatStr: string) =>
            parse(dateString, formatStr, new Date(), { locale: locales[currentLang] || enUS }), // Utilisation correcte des types
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
        getDay,
        locales,
    });

    // Utiliser useMemo pour éviter la recomputation des événements à chaque rendu
    const events: CalendarEvent[] = React.useMemo(() => {
        return infosEvents
            .filter((event) => event.title && event.id)
            .map((event) => ({
                title: event.title!,
                start: new Date(event.startDate!),
                end: new Date(event.endDate || event.startDate!),
                id: event.id!,
                description: event.description || '',
            }));
    }, [infosEvents]);

    // Mettre à jour les événements filtrés seulement quand les événements changent
    useEffect(() => {
        setFilteredEvents(events);
    }, [events]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <Calendar<CalendarEvent>
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: isMobile ? 'auto' : '200vh', width: isMobile ? 'auto' : 'auto' }}
                    messages={{
                        next: t('next'),
                        previous: t('previous'),
                        today: t('today'),
                        month: t('month'),
                        week: t('week'),
                        day: t('day'),
                        agenda: t('agenda'),
                    }}
                    views={isMobile ? { day: true } : { month: true, day: true }}
                    defaultView={isMobile ? Views.DAY : Views.MONTH}

                    components={!isMobile ? {
                        event: CustomEvent,
                    } : {
                        event: CustomEvent,
                        toolbar: ({ label, onNavigate}) => (

                            <div className="flex justify-between items-center p-2">
                                {isMobile && (<>
                                    <button onClick={() => onNavigate('PREV')} className="text-xs sm:text-sm md:text-base lg:text-lg font-bold p-1">
                                        {t('previous')}
                                    </button>
                                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">{label}</span>
                                    <button onClick={() => onNavigate('NEXT')} className="text-xs sm:text-sm md:text-base lg:text-lg font-bold p-1">
                                        {t('next')}
                                    </button>
                                </>)}
                            </div>
                        ),
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

const CustomEvent: React.FC<EventProps<CalendarEvent>> = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/event/${event.id}`);
        window.location.reload();
    };

    return (
        <div onClick={handleClick} className="m-2 p-2 border rounded bg-secondary cursor-pointer">
            <p className="font-bold truncate">{event.title}</p>
            {event.description && <p className="text-sm truncate">{event.description}</p>}
        </div>
    );
};

export default CalendarEvent;
