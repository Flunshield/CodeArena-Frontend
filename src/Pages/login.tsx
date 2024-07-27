import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext.tsx";
import { login } from "../Helpers/apiHelper.ts";
import { LoginForm } from "../Interface/Interface.ts";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";
import Label from "../ComposantsCommun/Label.tsx";
import Button from "../ComposantsCommun/Button.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import clsx from "clsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import LoaderMatch from "../ComposantsCommun/LoaderMatch.tsx";
import { jwtDecode } from "jwt-decode";
import { FadeIn, FadeInStagger } from '../ComposantsCommun/FadeIn.tsx';
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from '../ComposantsCommun/SectionIntro.tsx';

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [, setError] = useState<string | null>(null);
    const [errorUserName, setErrorUsername] = useState<boolean | null>(false);
    const [errorPassword, setErrorPassword] = useState<boolean | null>(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const authContext = useAuthContext();
    const isConnected = authContext.connected;

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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

            if (response.ok) {
                setNotificationMessage(t('connectSuccess'));
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(async () => {
                    try {
                        const result = await response.json();
                        const jwtDecoded = jwtDecode(result.message);
                        sessionStorage.setItem('authState', JSON.stringify({
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

    const goToForgotPassword = () => {
        navigate("/forgotPassword");
    }

    const goToSignUp = () => {
        navigate("/signup");
    }

    useEffect(() => {
        if (isConnected) {
            navigate("/dashboard");
        } else {
            setLoading(false);
        }
    }, [isConnected, navigate]);

    return (
        <Layout>
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
            ) : !isConnected ? (
                <Container className="flex flex-col items-center justify-center min-h-screen ">
                    <FadeIn className="w-full max-w-md">
                        <Card className="rounded-xl shadow-lg">
                            <CardContent className=" text-secondary w-full ">
                                <SectionIntro
                                    title={t('signIntoCodeArena')}
                                    className="mb-12 text-center"
                                >
                                </SectionIntro>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <FadeInStagger>
                                        <FadeIn duration={1}>
                                            <Label id="userName" className="flex flex-col font-bold text-secondary">
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
                                        </FadeIn>
                                        <FadeIn duration={1.3}>
                                            <Label id="password" className="flex flex-col font-bold text-secondary">
                                                {t('password')}
                                                <div className="relative">
                                                    <input
                                                        id="password"
                                                        className={clsx(
                                                            errorPassword && 'border-error border-4',
                                                            'h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full'
                                                        )}
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder={t('password')}
                                                        autoComplete="current-password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleShowPassword}
                                                        className="absolute inset-y-0 right-0 px-3 py-1"
                                                        aria-label={showPassword ? t('Hide password') : t('Show password')}
                                                    >
                                                        {showPassword ? (
                                                            <svg
                                                                className="w-6 h-6 text-gray-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 3 12 3a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19.071 19.071l-2.828-2.828M4.929 4.929l2.828 2.828"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                className="w-6 h-6 text-gray-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M2.458 12C3.732 7.943 7.455 5 12 5c4.546 0 8.268 2.943 9.542 7-.846 2.81-3.016 5.062-5.741 6.234M12 5c4.546 0 8.268 2.943 9.542 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </Label>
                                        </FadeIn>
                                    </FadeInStagger>
                                    <div className="flex flex-col justify-center mt-10">
                                        <Button type="submit" id="connect"
                                            className="bg-secondary hover:bg-button-hover text-tertiari w-full h-12 rounded-md uppercase transition duration-300">
                                            {t('connect')}
                                        </Button>
                                        <div className="flex flex-col text-center mt-5">
                                            <Button type="button" id="goToForgotPassword" className="text-center hover:text-cyan-800 text-secondary" onClick={goToForgotPassword}>
                                                {t('forgotPassword')}
                                            </Button>
                                            <Button type="button" id="goToSignUp" className="text-center hover:text-cyan-800 text-secondary" onClick={goToSignUp}>
                                                {t('register')}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </Container>
            ) : (
                <p>You are already connected!</p>
            )}
        </Layout>
    );
}

export default LoginPage;