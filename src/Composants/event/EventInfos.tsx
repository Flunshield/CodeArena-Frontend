import { Event } from "../../Interface/Interface.ts";
import { useAuthContext } from "../../AuthContext.tsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getElementByEndpoint, postElementByEndpoint, unsubscribeEvent } from "../../Helpers/apiHelper.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { formatDate } from "../../Helpers/formatHelper.ts";
import Button from "../../ComposantsCommun/Button.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";
import { Container } from "../../ComposantsCommun/Container.tsx";
import { FadeIn } from "../../ComposantsCommun/FadeIn.tsx";
import useUserInfos from "../../hook/useUserInfos.ts";
import { GROUPS } from "../../constantes/constantes.ts";

function EventInfos(): JSX.Element {
  const authContext = useAuthContext();
  const infosUser = useUserInfos();
  const isUser = infosUser.groups?.roles === GROUPS.USER;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [eventInfos, setEventInfos] = useState<Event>();
  const getEvent = getElementByEndpoint('event/findEvent?id=' + id, { token: authContext.accessToken ?? "", data: "" });
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const [canSubscribe, setCanSubscribe] = useState<boolean>(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleClickRegistered = () => {
    postElementByEndpoint('event/register', {
      token: authContext.accessToken ?? "",
      data: {
        userID: infosUser.id,
        eventID: eventInfos?.id,
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

  const handleClickUnsubscribe = async () => {
     await unsubscribeEvent('event/unsubscribe', {
      token: authContext.accessToken ?? "",
      userID: infosUser.id?.toString() ?? "",
      eventID: eventInfos?.id,
    }).then(response => {
      if (response.status === 200) {
        setIsRegistered(false);
        setNotificationMessage(t('unsubscribeSuccess'));
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
    getEvent.then(async (response) => {
      const result = await response.json();
      setEventInfos(result);
      if (result) {
        infosUser.userEvent?.find((event) => {
          if (event?.eventsID === parseInt(id ?? "")) {
            setIsRegistered(true);
          } else {
            setIsRegistered(false);
          }
        });
      }
    });
    if (eventInfos && (eventInfos?.userEvent?.length ?? 0 >= eventInfos?.playerMax)) {
      setCanSubscribe(false);
    }
  }, [isRegistered]);

  return (
    <Container className="mt-12 max-w-3xl">
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <FadeIn className="flex flex-col items-center">
        <Card className="border-2 border-tertiary shadow-lg bg-tertiari rounded-lg w-full">
          <CardContent className="text-neutral-900 p-8">
            <ul className="flex flex-col items-center">
              <li className="text-neutral-900 text-3xl text-center font-bold mb-6">
                {eventInfos?.title}
              </li>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                  <p className="mb-2">{t("dateDebut")}</p>
                  <p className="text-green-600 font-bold">{formatDate(eventInfos?.startDate, t)}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                  <p className="mb-2">{t("dateFin")}</p>
                  <p className="text-red-600 font-bold">{formatDate(eventInfos?.endDate, t)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg mt-4 mb-6 w-full">
                <p className="mb-2 text-3xl">{t("maxPlayer")}</p>
                <p className="text-5xl font-bold">{eventInfos?.numberRegistered}/{eventInfos?.playerMax}</p>
              </div>
              <div className="mb-6 text-center">
                <p className="mb-2 text-3xl">{t("rules")}</p>
                <p>{eventInfos?.description}</p>
              </div>
              <div className="mb-6 text-center">
                <p className="mb-2 text-3xl">{t("rewards")}</p>
                <p>{eventInfos?.rewards}</p>
              </div>
              <div className="flex justify-center">
                {canSubscribe && isUser && (
                  isRegistered ? (
                    <Button
                      type="button"
                      id="inscription"
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
    </Container>
  );
}

export default EventInfos;
