import EventDetails from "../Composants/event/EventDetails.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import { useEffect, useState } from "react";
import { getElementByEndpoint, postElementByEndpoint, unsubscribeEvent } from "../Helpers/apiHelper.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { Event } from "../Interface/Interface.ts";
import { useParams } from "react-router-dom";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";
import useUserInfos from "../hook/useUserInfos.ts";
import Notification from "../ComposantsCommun/Notification.tsx";

function PageEventDetails(): JSX.Element {
    const authContext = useAuthContext();
    const infosUser = useUserInfos();
    const { t } = useTranslation();
    const data = { token: authContext.accessToken ?? "" };
    const [infosEvent, setInfosEvent] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventNotFound, setEventNotFound] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [canSubscribe, setCanSubscribe] = useState<boolean>(true);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const { id } = useParams<{ id: string }>();
    const getAllEvents = getElementByEndpoint('evenement/findEvents?id=' + id, { token: data.token, data: "" });

    const handleClickRegistered = () => {
        if (!selectedEvent) return;
        postElementByEndpoint('tournament/inscription', {
            token: authContext.accessToken ?? "",
            data: {
                userID: infosUser.id,
                tournamentID: selectedEvent.id,
                points: infosUser.userRanking?.[0]?.points ?? 0
            }
        }).then(response => {
            if (response.status === 201) {
                setIsRegistered(true);
                setNotificationMessage(t('inscriptionSuccess'));
                setNotificationType('success');
                setShowNotification(true);
            } else {
                setNotificationMessage(t('inscriptionFail'));
                setNotificationType('error');
                setShowNotification(true);
            }
        });
    };

    const handleClickUnsubscribe = () => {
        if (!selectedEvent) return;
        unsubscribeEvent('event/unsubscribe', {
            token: authContext.accessToken ?? "",
            userID: infosUser.id?.toString() ?? "",
            eventID: selectedEvent.id
        }).then(response => {
            if (response.status === 200) {
                setIsRegistered(false);
                setNotificationMessage(t('unsubscribeSucces'));
                setNotificationType('success');
                setShowNotification(true);
            } else {
                setNotificationMessage(t('unsubscribeFail'));
                setNotificationType('error');
                setShowNotification(true);
            }
        });
    };

    useEffect(() => {
        if (infosEvent.length === 0) {
            getAllEvents.then(async (response) => {
                const result = await response.json();
                setInfosEvent(result);

                if (result && Array.isArray(result)) {
                    const eventFound = result.find(event => event.id == id);

                    if (eventFound) {
                        setSelectedEvent(eventFound);
                        setEventNotFound(false);
                        if (eventFound.numberRegistered >= eventFound.playerMax) {
                            setCanSubscribe(false);
                        } else {
                            setCanSubscribe(true);
                        }
                    } else {
                        setEventNotFound(true);
                    }
                }
            });
        }
    }, [infosEvent.length, getAllEvents, id]);

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
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
                    canSubscribe={canSubscribe}
                    isRegistered={isRegistered}
                    onRegister={handleClickRegistered}
                    onUnregister={handleClickUnsubscribe}
                />
            )}
        </Layout>
    );
}

export default PageEventDetails;
