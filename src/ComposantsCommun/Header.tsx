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

    const handleClickSingIn = () => {
        navigate("/login");
    };

    const handleClickSingUp = () => {
        navigate("/signUp");
    };



    return (
        <header className="z-50 text-secondary p-8 bg-secondary relative">
    <div className="flex start-0 top-0 absolute w-full">
        {isConnected && <NavBar />}
        <div className="flex justify-between w-full items-center">
            <div className="flex items-center">
                <img src="/logo.svg" alt="Logo codeArena" className="w-16 h-16 mr-3" />
                <a className="text-tertiari text-2xl m-3 font-bold" href={isConnected ? DASHBOARD : HOME}>
                    {t('CodeArena')}
                </a>
            </div>
            {!isConnected && (
                <div className="flex items-center">
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
                                <div className="flex justify-center"> {/* Wrap the buttons with this div */}
                                    <Button
                                        type="button"
                                        id="signIn"
                                        className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                                        onClick={handleClickSingIn}
                                    >
                                        {t('connection')}
                                    </Button>
                                    <Button
                                        type="button"
                                        id="signUp"
                                        className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary ml-2 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                                        onClick={handleClickSingUp}
                                    >
                                        {t('inscription')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="hidden sm:flex ml-2">
                        <Button
                            type="button"
                            id="signIn"
                            className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                            onClick={handleClickSingIn}
                        >
                            {t('connection')}
                        </Button>
                        <Button
                            type="button"
                            id="signUp"
                            className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary ml-2 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1"
                            onClick={handleClickSingUp}
                        >
                            {t('inscription')}
                        </Button>
                    </div>
                </div>
            )}
            {isConnected && (
                <div className="flex items-baseline sticky">
                    <BouttonProfile />
                </div>
            )}
        </div>
    </div>
</header>

    



    );
};

export default Header;
