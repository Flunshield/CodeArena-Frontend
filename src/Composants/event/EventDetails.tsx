import { Event } from "../../Interface/Interface.ts";
import { useTranslation } from "react-i18next";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { formatDate } from "../../Helpers/formatHelper.ts";
import { Container } from "../../ComposantsCommun/Container.tsx";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn.tsx";
import Button from "../../ComposantsCommun/Button.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext.tsx";
import useUserInfos from "../../hook/useUserInfos.ts";
import { getElementByEndpoint, postElementByEndpoint, unsubscribeEvent } from "../../Helpers/apiHelper.ts";
import Notification from "../../ComposantsCommun/Notification.tsx";

function EventDetails(): JSX.Element {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    const infosUser = useUserInfos();
    const data = { token: authContext.accessToken ?? "" };
    const [infosEvent, setInfosEvent] = useState<Event | null>(null);
    const [eventNotFound, setEventNotFound] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [canSubscribe, setCanSubscribe] = useState<boolean>(true);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getElementByEndpoint('evenement/findEventSingle?id=' + id, { token: data.token, data: "" });
                const result = await response.json();
                
                if (result) {
                    setInfosEvent(result);
                    setEventNotFound(false);

                    // Vérifier si l'utilisateur est déjà inscrit
                    const userIsRegistered = infosUser.userEvent?.some((event) => event?.eventsID === result.id);
                    setIsRegistered(!!userIsRegistered);

                    // Vérifier la possibilité de s'inscrire
                    setCanSubscribe(result.numberRegistered < result.playerMax);
                } else {
                    setEventNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
                setEventNotFound(true);
            }
        };

        fetchEventDetails();
    }, [id, data.token, infosUser.userEvent]);

    const handleClickRegistered = async () => {
        if (!infosEvent) return;
        try {
            const response = await postElementByEndpoint('evenement/inscription', {
                token: authContext.accessToken ?? "",
                data: {
                    userID: infosUser.id,
                    eventsID: infosEvent.id,
                    points: infosUser.userRanking?.[0]?.points ?? 0
                }
            });

            if (response.status === 201) {
                setIsRegistered(true);
                setNotificationMessage(t('inscriptionSuccess'));
                setNotificationType('success');

                // Incrémenter le nombre d'inscrits localement
                setInfosEvent((prevEvent) => prevEvent ? { ...prevEvent, numberRegistered: prevEvent.numberRegistered + 1 } : null);
            } else {
                setNotificationMessage(t('inscriptionFail'));
                setNotificationType('error');
            }
        } catch (error) {
            console.error("Error registering for event:", error);
            setNotificationMessage(t('inscriptionFail'));
            setNotificationType('error');
        } finally {
            setShowNotification(true);
        }
    };

    const handleClickUnsubscribe = async () => {
        if (!infosEvent) return;
        try {
            const response = await unsubscribeEvent('evenement/unsubscribe', {
                token: authContext.accessToken ?? "",
                userID: infosUser.id ?? 0,
                eventsID: infosEvent.id
            });

            if (response.status === 200) {
                setIsRegistered(false);
                setNotificationMessage(t('unsubscribeSucces'));
                setNotificationType('success');

                // Décrémenter le nombre d'inscrits localement
                setInfosEvent((prevEvent) => prevEvent ? { ...prevEvent, numberRegistered: prevEvent.numberRegistered - 1 } : null);
            } else {
                setNotificationMessage(t('unsubscribeFail'));
                setNotificationType('error');
            }
        } catch (error) {
            console.error("Error unsubscribing from event:", error);
            setNotificationMessage(t('unsubscribeFail'));
            setNotificationType('error');
        } finally {
            setShowNotification(true);
        }
    };

    return (
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {eventNotFound ? (
                <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-4 sm:m-6 md:m-8 lg:m-10 flex justify-center items-center mt-7">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                        {t("noEvent")}
                    </p>
                </CardContent>
            ) : (
                <FadeInStagger>
                    <FadeIn className="flex flex-col items-center mt-5">
                        <Card className="border-2 border-tertiary shadow-lg bg-tertiari rounded-lg w-full">
                            <CardContent className="text-neutral-900 p-8">
                                <ul className="flex flex-col items-center">
                                    <li className="text-neutral-900 text-3xl text-center font-bold mb-6">
                                        {infosEvent?.title}
                                    </li>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                                            <p className="mb-2">{t("dateDebut")}</p>
                                            <p className="text-green-600 font-bold">{formatDate(infosEvent?.startDate, t)}</p>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                                            <p className="mb-2">{t("dateFin")}</p>
                                            <p className="text-red-600 font-bold">{formatDate(infosEvent?.endDate, t)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg mt-4 mb-6 w-full">
                                        <p className="mb-2 text-3xl">{t("maxPlayer")}</p>
                                        <p className="text-5xl font-bold">{infosEvent?.numberRegistered}/{infosEvent?.playerMax}</p>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <p className="mb-2 text-3xl">{t("rules")}</p>
                                        <p>{infosEvent?.description}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        {canSubscribe && (
                                            isRegistered ? (
                                                <Button
                                                    type="button"
                                                    id="unsubscribe"
                                                    onClick={handleClickUnsubscribe}
                                                    className="border-2 border-tertiary bg-neutral-200 hover:bg-neutral-300 rounded-xl p-3 font-bold text-2xl shadow-md"
                                                >
                                                    {t("unsubscribe")}
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    id="inscription"
                                                    onClick={handleClickRegistered}
                                                    className="border-2 border-tertiary bg-neutral-200 hover:bg-neutral-300 rounded-xl p-3 font-bold text-2xl shadow-md"
                                                >
                                                    {t("inscription")}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </ul>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </FadeInStagger>
            )}
        </Container>
    );
}

export default EventDetails;
