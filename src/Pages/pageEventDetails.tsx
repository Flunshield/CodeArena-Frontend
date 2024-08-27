import EventDetails from "../Composants/event/EventDetails.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import { useEffect, useState } from "react";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { Event } from "../Interface/Interface.ts";
import { useParams } from "react-router-dom";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";

function PageEventDetails(): JSX.Element {
    const authContext = useAuthContext();
    const data = { token: authContext.accessToken ?? "" };
    const [infosEvent, setInfosEvent] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventNotFound, setEventNotFound] = useState<boolean>(false); // État pour indiquer si l'événement n'est pas trouvé
    const { id } = useParams<{ id: string }>();
    const getAllEvents = getElementByEndpoint('evenement/findEvents?id=' + id, { token: data.token, data: "" });
    const { t } = useTranslation();
    useEffect(() => {
        if (infosEvent.length === 0) {
            console.log(id);
            getAllEvents.then(async (response) => {
                const result = await response.json();
                setInfosEvent(result);

                if (result && Array.isArray(result)) {
                    const eventFound = result.find(event => event.id == id);

                    if (eventFound) {
                        console.log("Événement trouvé:", eventFound);
                        setSelectedEvent(eventFound);
                        setEventNotFound(false); // Réinitialiser l'état si un événement est trouvé
                    } else {
                        console.log("Aucun événement trouvé avec cet ID.");
                        setEventNotFound(true); // Mettre à jour l'état pour indiquer que l'événement n'est pas trouvé
                    }
                }
            });
        }
    }, [infosEvent.length, getAllEvents, id]);

    return (
        <Layout>
            {eventNotFound ? (
                <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-4 sm:m-6 md:m-8 lg:m-10 flex justify-center items-center">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                        {t("noEvent")}
                    </p>
                </CardContent>
            ) : (
                <EventDetails
                    infosEvents={selectedEvent ? [selectedEvent] : infosEvent}
                    isImg={false}
                    className="m-3 sm:m-5 md:m-6 lg:m-8 rounded-xl border-tertiari p-4 sm:p-5 md:p-6 lg:p-8 h-full w-full bg-tertiary-light"
                />
            )}
        </Layout>
    );
}

export default PageEventDetails;
