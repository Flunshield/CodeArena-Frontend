import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext.tsx";
import Button from "./Button.tsx";
import { useTranslation } from "react-i18next";
import { NavFlags } from "../Interface/Interface.ts";

const Header = () => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Utilisez `i18n` directement ici

    const handleClickSingIn = () => {
        navigate("/login");
    };

    const handleClickSingUp = () => {
        navigate("/signUp");
    };

    const handleClickSingOut = () => {
        navigate("/logout");
    };

    const handleChangeLanguage = async (language: string) => {
        await i18n.changeLanguage(language);
        await i18n.reloadResources();
    };

    const navItems: NavFlags[] = [
        {
            src: "src/assets/drapeaux/fr.png",
            value: "fr",
            displayLink: true,
            alt: "drapeau français"
        },
        {
            src: "src/assets/drapeaux/gb.png",
            value: "en",
            displayLink: true
        }
    ];

    const NavFlagsComponent = () => (
        <div>
            {navItems.map((item) =>
                item.displayLink ? (
                    // Ajoutez une clé unique pour chaque élément
                    <button key={item.value} type="button" onClick={() => handleChangeLanguage(item.value)} className="mr-3">
                        <img src={item.src} alt={item.alt} />
                    </button>
                ) : null
            )}
        </div>
    );

    return (
        <header>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="flex start-0 justify-between">
                    <h1 className="text-white text-2xl m-3 font-bold">CodeArena</h1>
                    {!isConnected && (
                        <div className="flex items-baseline">
                            <NavFlagsComponent />
                            <Button type="button" id="signIn" className="border-1 text-white text-1xl m-3" onClick={handleClickSingIn}>
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
                            <NavFlagsComponent />
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
