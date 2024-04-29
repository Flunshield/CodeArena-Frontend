import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar.tsx";
import BouttonProfile from "../Composants/BouttonProfile.tsx";
import { DASHBOARD, HOME } from "../constantes/constantes.ts";
import loginIcons from "/assets/icons/iconsLogin.svg";

const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showIconsPopUp, setShowIconsPopUp] = useState(false);

    const handleClickSingIn = () => {
        navigate("/login");
    };

    const handleClickSingUp = () => {
        navigate("/signUp");
    };



    return (
        <header className="z-50">
            <div className="flex start-0 top-0 absolute w-full">
                {isConnected && <NavBar />}
                <div className="flex justify-between w-full">
                    <a className="text-tertiari text-2xl m-3 font-bold" href={isConnected ? DASHBOARD : HOME}>
                        {t('CodeArena')}
                    </a>
                    {!isConnected && (
                        <div className="flex items-baseline">
                            <div className="block sm:hidden relative">
                                <img 
                                    id="login icons"
                                    src={loginIcons}
                                    alt="logo du site web"
                                    onMouseEnter={() => setShowIconsPopUp(true)}
                                    onMouseLeave={() => setShowIconsPopUp(false)} />
                                {showIconsPopUp && (
                                    <div className=" absolute top-12 right-0 z-10 border-2 shadow-md p-2">
                                        <Button type="button" id="signIn" className="border-1 text-tertiari text-1xl m-4 " onClick={handleClickSingIn}>
                                            {t('connection')}
                                        </Button>
                                        <Button type="button" id="signUp" className="border-1 text-tertiari text-1xl m-3 border-2 border-tertiari rounded-md p-1" onClick={handleClickSingUp}>
                                            {t('inscription')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="hidden sm:flex">
                                <Button type="button" id="signIn" className="border-1 text-tertiari text-1xl m-4" onClick={handleClickSingIn}>
                                    {t('connection')}
                                </Button>
                                <Button type="button" id="signUp" className="border-1 text-tertiari text-1xl m-3 border-2 border-tertiari rounded-md p-1" onClick={handleClickSingUp}>
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
