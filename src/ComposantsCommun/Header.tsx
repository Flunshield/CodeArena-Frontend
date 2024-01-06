import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../AuthContext.tsx";
import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {changeLanguage} from "../i18n.ts";
// Assurez-vous que le chemin vers le logo est correct

const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickSingIn = () => {
        navigate("/login");
    }
    const handleClickSingUp = () => {
        navigate("/register");
    }


    // Exemple de code pour changer la langue
    // DEBUT
    const [lang, setLang] = useState("fr"); // Définissez la langue par défaut

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChangeLanguage = (language: string) => {
        setLang(language);
    };

    useEffect(() => {
        changeLanguage(lang);
    }, [lang]);

    //FIN

    return (
        <header>
            <div className="absolute top-0 left-0 w-full h-full">
                {/* Si l'utilisateur n'est pas connecté */}
                {!isConnected &&
                <div className="flex start-0 justify-between">
                    <h1 className="text-white text-2xl m-3 font-bold">CodeArena</h1>
                    <div className="flex items-baseline">
                        <Button type="button" id="signIn" className="border-1 text-white text-1xl m-3" onClick={handleClickSingIn}> {t('connection')} </Button>
                        <Button type="button" id="signUp"
                                className="border-1 text-white text-1xl m-3 border-2 border-white rounded-md p-1" onClick={handleClickSingUp}> {t('inscription')} </Button>
                    </div>
                </div>
                }
            </div>
        </header>
    );
};

export default Header;
