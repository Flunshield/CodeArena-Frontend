import React from 'react';
import iconeMail from '/assets/iconeMail.png';
import { useTranslation } from "react-i18next";
import { ENTREPRISE, EVENT, LEGAL, MAIL, PRIVACY_POLICY, RANKING, TERMS, TOURNAMENT } from "../constantes/constantesRoutes.ts";
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
        <FadeIn duration={1.0}>
            <footer className={clsx(className, "w-full h-auto text-tertiari bottom-0 relative p-4 z-0 bg-secondary")}>
                <div className="flex flex-wrap justify-center items-center">
                    {isConnected && (
                        <>
                            <div className="flex flex-col mt-24 w-1/3">
                                <ul className="text-center md:text-left">
                                    <li className="font-bold text-2xl">{t('Développeur')}</li>
                                    <li className="mt-5 hover:underline"><a href={EVENT} id="entrepriseAchat">{t('Evenement')}</a></li>
                                    <li className="mt-5 hover:underline"><a href={TOURNAMENT} id="entrepriseAchat">{t('Tournois')}</a></li>
                                    <li className="mt-5 hover:underline"><a href={RANKING} id="entrepriseAchat">{t('Classement')}</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col mt-5 w-1/3">
                                <ul className="text-center md:text-left">
                                    <li className="font-bold text-2xl">{t('Entreprise')}</li>
                                    <li className="mt-5 hover:underline"><a href={ENTREPRISE} id="entrepriseAchat">{t('entreprise')}</a></li>
                                </ul>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col mt-24 w-1/3">
                        <ul className="text-center md:text-left">
                            <li className="font-bold text-2xl">{t('Société')}</li>
                            <li className="mt-5 hover:underline"><a href="#">{t('À propos')}</a></li>
                            <li className="mt-5 hover:underline"><a href={PRIVACY_POLICY}>{t('politiqueConfidentialite')}</a></li>
                            <li className="mt-5 hover:underline"><a href={LEGAL}>{t('mentionLegal')}</a></li>
                            <li className="mt-5 hover:underline"><a href={TERMS}>{t('cgv')}</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col mt-5 items-center md:items-start">
                        <p className="font-bold text-2xl text-center md:text-left">{t('retrouverNous')}</p>
                        <div className="flex mt-5 justify-around w-full">
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
                        <li className="mt-5 flex justify-center md:justify-start"><img src={iconeMail} alt="icone de mail" className="mr-5" />{MAIL}</li>
                    </div>

                    <div className="flex flex-col mt-10 items-center md:items-start text-center md:text-left">
                        <NavFlagsComponent />
                    </div>
                </div>
                <div className="mx-auto border-t-2 border-white w-2/3 mt-8"></div>
                <div className="mt-8 text-center">
                    <p>Copyright © {new Date().getFullYear()} CodeArena</p>
                </div>
            </footer>

        </FadeIn>
    );
};

export default Footer;