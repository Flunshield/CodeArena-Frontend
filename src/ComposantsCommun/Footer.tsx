import React from 'react';
import iconeMail from '/assets/iconeMail.png';
import { useTranslation } from "react-i18next";
import { ENTREPRISE, LEGAL, MAIL, PRIVACY_POLICY, TERMS } from "../constantes/constantesRoutes.ts";
import { NavFlags } from "../Interface/Interface.ts";
import { useAuthContext } from "../AuthContext.tsx";
import drapFr from "/assets/drapeaux/fr.svg";
import drapEn from "/assets/drapeaux/gb.svg";
import { changeLanguage } from "../i18n.ts";
import clsx from "clsx";
import { FadeIn } from './FadeIn.tsx'; // Assurez-vous d'importer correctement FadeIn

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = async (language: string) => {
        await changeLanguage(language);
        await i18n.reloadResources();
    };

    const navItems: NavFlags[] = [
        {
            src: drapFr,
            value: "fr",
            displayLink: true,
            alt: "drapeau français"
        },
        {
            src: drapEn,
            value: "en",
            displayLink: true
        }
    ];

    const NavFlagsComponent = () => (
        <div>
            {navItems.map((item) =>
                item.displayLink ? (
                    <button key={item.value} type="button" onClick={() => handleChangeLanguage(item.value)} className="mr-3">
                        <img src={"../" + item.src} alt={item.alt} className="w-10 h-auto" />
                    </button>
                ) : null
            )}
        </div>)

    return (
        <FadeIn duration={1.0}> {/* Ajout du composant FadeIn avec une durée personnalisée */}
            <footer className={clsx(className, "w-full h-auto text-tertiari bottom-0 relative p-4 z-0 bg-secondary")}>
                <div className="flex mb-3 flex-col md:flex-row md:justify-between">
                    {isConnected &&
                        <div className="mt-5 md:flex-col ">
                            <p className="font-bold text-2xl">{t('CodeArena')}</p>
                            <p className="mt-5 hover:underline"><a href={ENTREPRISE} id="entrepriseAchat">{t('entreprise')}</a></p>
                        </div>
                    }
                    <div className="md:flex-col mt-5">
                        <ul>
                            <li className="font-bold text-2xl">{t('contact')}</li>
                            <li className="mt-5 flex md:justify-between"><img src={iconeMail} alt="icone de mail" className="mr-5" />{MAIL}</li>
                            <li className="mt-10 hover:underline"><a href={PRIVACY_POLICY}>{t('politiqueConfidentialite')}</a></li>
                            <li className="mt-2 hover:underline"><a href={LEGAL}>{t('mentionLegal')}</a></li>
                            <li className="mt-2 hover:underline"><a href={TERMS}>{t('cgv')}</a></li>
                        </ul>
                    </div>
                    <div className="flex-col mt-5">
                        <p className="font-bold text-2xl">{t('retrouverNous')}</p>
                        <div className="flex mt-10 justify-around">
                            <button
                                onClick={() => { window.location.href = 'https://facebook.com'; }}
                                className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                            >
                                <img src="/assets/facebook.svg" alt="Facebook" />
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    Facebook
                                </span>
                            </button>
                            <button
                                onClick={() => { window.location.href = 'https://x.com'; }}
                                className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                            >
                                <img src="/assets/x.svg" alt="X" />
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    X
                                </span>
                            </button>
                            <button
                                onClick={() => { window.location.href = 'https://discord.com'; }}
                                className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                            >
                                <img src="/assets/discord.svg" alt="Discord" />
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    Discord
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-col mt-24 md:mt-10 text-center">
                        <NavFlagsComponent />
                    </div>
                </div>
                <div className="mx-auto border-t-2 border-white w-2/3"></div>
                <div className="mt-16 text-center">
                    <p>Copyright © {new Date().getFullYear()} CodeArena</p>
                </div>
            </footer>
        </FadeIn>
    );
};

export default Footer;