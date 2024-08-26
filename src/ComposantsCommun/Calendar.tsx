import React from 'react';
import { Calendar, dateFnsLocalizer, EventProps, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tournament } from '../Interface/Interface';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate

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
    locales: fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
})

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

    // Assurez-vous que chaque tournoi a des heures précises de début et de fin
    const events: Event[] = infosTournament.map((tournament) => ({
        title: tournament.title,
        // Convertir les dates en objets Date pour gérer les heures spécifiques
        start: new Date(tournament.startDate),
        end: new Date(tournament.endDate || tournament.startDate), 
        id: tournament.id,
        description: tournament.description,
    }));

    return (
        <Container className="bg-white p-4 rounded-lg shadow-lg">
            <Calendar<Event>
                localizer={localizer}
                events={events}
                formats={{ timeGutterFormat: 'HH:mm'}}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                messages={{
                    next: t('next'),
                    previous: t('previous'),
                    today: t('today'),
                    month: t('month'),
                    week: t('week'),
                    day: t('day'),
                    agenda: t('agenda'),
                }}
                views={{ week: true, day: true }} 
                defaultView={Views.WEEK} 
                components={{
                    event: CustomEvent,
                    week: {
                        event: CustomEvent,
                    },
                    day: {
                        event: CustomEvent,
                    },
                }}
                step={30} // Intervalle de 30 minutes pour afficher les créneaux horaires
                timeslots={2} // Divise chaque heure en 2 créneaux de 30 minutes
                min={new Date(1970, 1, 1, 8, 0, 0)} // Début de la journée à 8h00
                max={new Date(1970, 1, 1, 20, 0, 0)} // Fin de la journée à 20h00
            />
        </Container>
    );
};

export default CalendarTournament;
