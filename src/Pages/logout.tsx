import {useEffect, useState} from "react";
import {useAuthContext} from "../AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {logout} from "../Helpers/apiHelper.ts";
import LoaderMatch from "../ComposantsCommun/LoaderMatch.tsx";
import {useTranslation} from "react-i18next";
import Notification from "../ComposantsCommun/Notification.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";

export function LogoutPage() {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const logoutFunction = async () => {
        try {
            return await logout('auth/logout');
        } catch (error) {
            setError('Erreur lors de la déconnexion. Veuillez réessayer.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        } else {
            logoutFunction().then((response) => {
                if (response?.ok) {
                    sessionStorage.removeItem('authState');
                    setTimeout(() => {
                        window.location.reload();
                        setLoading(false);
                        setNotificationMessage(t('disconnectSuccess'));
                        setNotificationType('success');
                        setShowNotification(true);
                    }, 2000);
                } else {
                    setNotificationMessage(t('errorDisconnect'));
                    setNotificationType('error');
                    setShowNotification(true);
                    setError('');
                }
            });
        }
    }, [isConnected, navigate]);

    return (
        <Layout>
            <div>
                {showNotification && (
                    <Notification
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
                <div className="flex items-center justify-center h-screen">
                    {loading && (
                        <LoaderMatch msg="Déconnexion en cours..." className="z-50 flex flex-col items-center p-5 rounded-lg bg-gris-chaud"/>
                    )}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            </div>
        </Layout>
    );
}
