import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../AuthContext.tsx";
import {login} from "../Helpers/apiHelper.ts";
import {LoginForm} from "../Interface/Interface.ts";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import tree from "/assets/tree.svg";
import {useTranslation} from "react-i18next";
import Label from "../ComposantsCommun/Label.tsx";
import Button from "../ComposantsCommun/Button.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import clsx from "clsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import LoaderMatch from "../ComposantsCommun/LoaderMatch.tsx";
import {jwtDecode} from "jwt-decode";

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [errorUserName, setErrorUsername] = useState<boolean | null>(false);
    const [errorPassword, setErrorPassword] = useState<boolean | null>(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const authContext = useAuthContext();
    const isConnected = authContext.connected;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName && !password) {
            setErrorUsername(true);
            setErrorPassword(true);
            setError(t('ndcMdpMandatory'));
            return;
        } else if (!userName) {
            setErrorUsername(true);
            setErrorPassword(false);
            setError(t('ndcMandatory'));
            return;
        } else if (!password) {
            setErrorPassword(true);
            setErrorUsername(false);
            setError(t('mdpMandatory'));
            return;
        }

        setErrorUsername(false);
        setErrorPassword(false);

        try {
            setLoading(true);
            const data: LoginForm = { userName, password };
            const response = await login('auth/login', data);
            console.log(response)
            if (response.ok) {
                setNotificationMessage(t('connectSuccess'));
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(async () => {
                    try {
                        const result = await response.json();
                        const jwtDecoded = jwtDecode(result.message);
                        localStorage.setItem('authState', JSON.stringify({
                            accessToken: result.message,
                            connected: true,
                            infosUser: jwtDecoded,
                        }));
                        window.location.reload();
                    } catch (jsonError) {
                        console.error("Invalid JSON response:", jsonError);
                        setNotificationMessage(t('errorParsingResponse'));
                        setNotificationType('error');
                        setShowNotification(true);
                        setLoading(false);
                    }
                }, 1000);
            } else {
                setNotificationMessage(t('errorNdcMdp'));
                setNotificationType('error');
                setShowNotification(true);
                setError(t('errorNdcMdp'));
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            setError('Erreur lors de la connexion. Veuillez réessayer.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (isConnected) {
            navigate("/dashboard");
        } else {
            setLoading(false);
        }
    }, [isConnected, navigate]);

    return (
        <Layout classnameMain="-mt-16">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <LoaderMatch msg={t('attemptConnexion')} className="z-50 bg-gris-chaud rounded-lg" />
                </div>
            )
                :
            !isConnected ? (
                <div className="flex flex-row justify-around mb-64">
                    <Card className="rounded-xl w-96 mt-32 m-5">
                        <CardContent className="bg-tertiari text-tertiari w-full pb-6 pt-6">
                            <div className="mt-2 mb-2">
                                <div className="flex flex-col mb-5 text-center font-bold">
                                    <p id="titleConnect" className="text-3xl text-primary">
                                        {t('signIntoCodeArena')}
                                    </p>
                                    {error && <p className="text-error mt-2">{error}</p>}
                                </div>
                                <form onSubmit={handleSubmit} className="pr-12 pl-12">
                                    <Label id="userName" className="flex flex-col font-bold text-primary">
                                        {t('userName')}
                                        <input
                                            id="userName"
                                            className={clsx(errorUserName && "border-error border-4", "h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300")}
                                            placeholder={t('userName')}
                                            type="text"
                                            value={userName}
                                            autoComplete="current-username"
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </Label>
                                    <br/>
                                    <Label id="password" className="flex flex-col font-bold text-primary">
                                        {t('password')}
                                        <input
                                            id="password"
                                            className={clsx(errorPassword && "border-error border-4", "h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300")}
                                            type="password"
                                            placeholder={t('password')}
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Label>
                                    <br/>
                                    <div className="flex flex-col justify-center mt-10">
                                        <Button type="submit" id="connect"
                                                className="bg-secondary w-full h-12 rounded-md uppercase">
                                            {t('connect')}
                                        </Button>
                                        <div className="flex flex-col mt-5">
                                            <a href="/forgotPassword" className="text-center text-primary">
                                                {t('forgotPassword')}
                                            </a>
                                            <a href="/signUp" className="text-center text-primary">
                                                {t('register')}
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                    <img
                        className="bg-primary hidden xl:block absolute right-0 -z-10"
                        src={tree}
                        alt="arbre design"
                        id="arbre"
                    />
                </div>
            ) : (
                <p>You are already connected!</p>
            )}
        </Layout>
    );
}

export default LoginPage;
