import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar.tsx";
import BouttonProfile from "../Composants/BouttonProfile.tsx";
import {DASHBOARD, HOME} from "../constantes/constantes.ts";

    const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickSingIn = () => {
        navigate("/login");
    };

    const handleClickSingUp = () => {
        navigate("/signUp");
    };



    return (
        <header className="z-50">
                <div className="flex start-0 top-0 absolute w-full">
                    {isConnected && <NavBar/>}
                    <div className="flex justify-between w-full">
                        <a className="text-tertiari text-2xl m-3 font-bold" href={isConnected ? DASHBOARD : HOME}>{t('CodeArena')}</a>
                    {!isConnected && (
                        <div className="flex items-baseline">
                            <Button type="button" id="signIn" className="border-1 text-tertiari text-1xl m-3"
                                    onClick={handleClickSingIn}>
                                {t('connection')}
                            </Button>
                            <Button
                                type="button"
                                id="signUp"
                                className="border-1 text-tertiari text-1xl m-3 border-2 border-tertiari rounded-md p-1"
                                onClick={handleClickSingUp}
                            >
                                {t('inscription')}
                            </Button>
                        </div>
                    )}
                    {isConnected && (
                        <div className="flex items-baseline sticky">
                            <BouttonProfile/>
                        </div>
                    )}
                    </div>
                </div>
        </header>
    );
};

export default Header;
