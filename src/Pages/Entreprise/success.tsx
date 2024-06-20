import Layout from "../../ComposantsCommun/Layout.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {useEffect, useState} from "react";
import Card from "../../ComposantsCommun/Card.tsx";
import {useTranslation} from "react-i18next";
import Notification from "../../ComposantsCommun/Notification.tsx";
import {LOGOUT} from "../../constantes/constantesRoutes.ts";

function Success (){
    const {search} = useLocation();
    const {t} = useTranslation();
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const sessionId = params.get('session_id');
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken

    const [isError, setIsError] = useState(false);
    const [isCodeError, setIsCodeError] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        postElementByEndpoint('stripe/success', {
            token: authContext.accessToken ?? "",
            data: {sessionId: sessionId ?? "", userId: infos.data.id}
        })
            .then(response => {
                return response.status;
            })
            .then(data => {
                if (data === 201) {
                    setNotificationMessage(t("successSubscription"));
                    setNotificationType('success');
                    setShowNotification(true);
                    setTimeout(() => {
                        navigate(LOGOUT);
                    }, 3000);
                } else {
                    setIsError(true);
                    setIsCodeError(data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du message :", error);
            });
    }, []);


    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                    delay={2000}
                />
            )}
            <div className="flex justify-center text-center">
                {isError ?
                    <Card className="bg-secondary text-tertiari max-md:p-5 max-md:mt-32 p-20 mt-64">
                        <h1 className="text-2xl mb-10">{t("erreurTransac")}</h1>
                        <p> {t("contactSupport")} {isCodeError})</p>
                    </Card>
                    :
                    <Card className="bg-secondary text-tertiari max-md:p-5 max-md:mt-32 p-20 mt-64">
                        <h1 className="text-tertiari">{t("redirection")}</h1>
                        <p> {t("msgRedirectionLink")} <a href={"/"} className="text-blue-700">{t("link")}.</a>
                        </p>
                    </Card>
                }
            </div>
        </Layout>
    );
}

export default Success;