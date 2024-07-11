import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar.tsx";
import BouttonProfile from "../Composants/BouttonProfile.tsx";
import { DASHBOARD, HOME } from "../constantes/constantesRoutes.ts";
import loginIcons from "/assets/icons/iconsLogin.svg";

const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showIconsPopUp, setShowIconsPopUp] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowIconsPopUp(false);
            }
        };
        const handleScroll = () => {
            setShowIconsPopUp(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClickSignIn = () => {
        navigate("/login");
    };

    const handleClickSignUp = () => {
        navigate("/signUp");
    };

    return (
        <header className="z-50 text-tertiari px-4 md:px-8 bg-secondary relative">
            <div className="flex justify-between items-center w-full">
                {isConnected && <div className="flex start-0 top-0 absolute py-6 w-full"><NavBar /></div>}
                <div className="flex justify-between px-10 py-3 w-full items-center md:space-x-1">
                    <div className="flex items-center">
                        <img src="/logo.svg" alt="Logo codeArena" className="w-16 h-16 mr-3" />
                        <a className="text-tertiari text-3xl m-3 font-bold" href={isConnected ? DASHBOARD : HOME}>
                            {t('CodeArena')}
                        </a>
                    </div>
                </div>
                <div className="flex py-2 items-center space-x-2">
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
                                    onMouseEnter={() => setShowIconsPopUp(true)}
                                    onMouseLeave={() => setShowIconsPopUp(false)}
                                />
                                {showIconsPopUp && (
                                    <div ref={popupRef} className="fixed right-5 bg-secondary text-tertiari border-2 border-tertiari p-2 rounded shadow">
                                        <div className="flex justify-center">
                                            <Button
                                                type="button"
                                                id="signIn"
                                                className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                                                onClick={handleClickSignIn}
                                            >
                                                {t('connection')}
                                            </Button>
                                            <Button
                                                type="button"
                                                id="signUp"
                                                className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary ml-2 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                                                onClick={handleClickSignUp}
                                            >
                                                {t('inscription')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row space-x-4 mt-4">
                                <Button
                                    type="button"
                                    id="signIn"
                                    className="bg-gray-700 text-tertiari p-2 md:px-4 py-3 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                                    onClick={handleClickSignIn}
                                >
                                    {t('connection')}
                                </Button>
                                <Button
                                    type="button"
                                    id="signUp"
                                    className="bg-gray-700 text-tertiari p-2 md:px-4 py-3 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
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
