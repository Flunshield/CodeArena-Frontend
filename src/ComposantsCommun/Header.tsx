import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar.tsx";
import BouttonProfile from "../Composants/BouttonProfile.tsx";
import { DASHBOARD, HOME } from "../constantes/constantesRoutes.ts";
import loginIcons from "/assets/photosProfiles/noImage.svg";

const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handlerPopUp = () => {
        setShowPopup(!showPopup);
    };

    const handleClickSignIn = () => {
        navigate("/login");
    };

    const handleClickSignUp = () => {
        navigate("/signUp");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        const handleScroll = () => {
            setShowPopup(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="z-50 text-tertiari px-4 md:px-8 bg-secondary relative">
            <div className="flex justify-between items-center w-full">
                {isConnected && <div className="flex start-0 top-0 absolute sm:py-10 py-6 w-full"><NavBar /></div>}

                <div className="flex justify-between px-10 py-3 w-full items-center md:space-x-1">
                    <div className="flex items-center">
                        {!isConnected && (
                            <a href={isConnected ? DASHBOARD : HOME}>
                                <img src="/logo.svg" alt="Logo codeArena"
                                    className="sm:block w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-3 sm:mt-2 -ml-5" />
                            </a>
                        )}
                        <a className="hidden sm:block text-tertiari text-3xl font-bold truncate"
                            href={isConnected ? DASHBOARD : HOME}>
                            {t('CodeArena')}
                        </a>
                    </div>
                </div>
                <div className="flex sm:py-3 sm:mt-5 py-3 items-center space-x-2">
                    {isConnected ? (
                        <div className="flex items-center">
                            <BouttonProfile />
                        </div>
                    ) : (
                        <>
                            <div className="block sm:hidden relative">
                                <img
                                    id="login icons"
                                    src={loginIcons}
                                    alt="logo du site web"
                                    className="pb-5 pl-10 h-full w-36 rounded-full"
                                    onClick={handlerPopUp}
                                    onMouseEnter={() => setShowPopup(true)}
                                    onMouseLeave={() => setShowPopup(false)}
                                />
                                {showPopup && (
                                    <div
                                        ref={popupRef}
                                        className="fixed right-2 bg-secondary text-tertiari border-2 border-tertiari p-2 rounded shadow"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <Button
                                                type="button"
                                                id="signIn"
                                                className="bg-gray-700 text-tertiari p-3 md:px-2 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 min-w-[100px] truncate"
                                                onClick={handleClickSignIn}
                                            >
                                                {t('connection')}
                                            </Button>
                                            <Button
                                                type="button"
                                                id="signUp"
                                                className="bg-gray-700 text-tertiari p-3 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 min-w-[100px] truncate"
                                                onClick={handleClickSignUp}
                                            >
                                                {t('inscription')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="hidden sm:flex flex-row justify-center items-center space-x-4 mt-2 mb-3">
                                <Button
                                    type="button"
                                    id="signIn"
                                    className="bg-gray-700 text-tertiari px-4 py-2 md:px-4 md:py-3 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 min-w-[100px] truncate"
                                    onClick={handleClickSignIn}
                                >
                                    {t('connection')}
                                </Button>
                                <Button
                                    type="button"
                                    id="signUp"
                                    className="bg-gray-700 text-tertiari px-4 py-2 md:px-4 md:py-3 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 min-w-[100px] truncate"
                                    onClick={handleClickSignUp}
                                >
                                    {t('inscription')}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
