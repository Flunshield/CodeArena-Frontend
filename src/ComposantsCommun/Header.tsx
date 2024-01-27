import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar.tsx";

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

    const handleClickSingOut = () => {
        navigate("/logout");
    };


    return (
        <header className="z-20">
                <div className="flex start-0 top-0 absolute w-full">
                    {isConnected && <NavBar/>}
                    <div className="flex justify-between w-full">
                        <h1 className="text-white text-2xl m-3 font-bold">{t('CodeArena')}</h1>
                    {!isConnected && (
                        <div className="flex items-baseline">
                            <Button type="button" id="signIn" className="border-1 text-white text-1xl m-3"
                                    onClick={handleClickSingIn}>
                                {t('connection')}
                            </Button>
                            <Button
                                type="button"
                                id="signUp"
                                className="border-1 text-white text-1xl m-3 border-2 border-white rounded-md p-1"
                                onClick={handleClickSingUp}
                            >
                                {t('inscription')}
                            </Button>
                        </div>
                    )}
                    {isConnected && (
                        <div className="flex items-baseline">
                            <Button
                                type="button"
                                id="signOut"
                                className="border-1 text-white text-1xl m-3 border-2 border-white rounded-md p-1"
                                onClick={handleClickSingOut}
                            >
                                {t('disonnect')}
                            </Button>
                        </div>
                    )}
                    </div>
                </div>
        </header>
    );
};

export default Header;
