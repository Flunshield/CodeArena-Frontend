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
import { FadeIn } from './FadeIn.tsx';

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
            displayLink: true,
            alt: "drapeau anglais"
        }
    ];

    const NavFlagsComponent = () => (
        <div className="flex space-x-4">
            {navItems.map((item) => {
                const isActive = i18n.language === item.value;
                return (
                    item.displayLink ? (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => handleChangeLanguage(item.value)}
                            className={clsx("transition-transform duration-300 transform hover:scale-110", {
                                "opacity-50": isActive
                            })}
                        >
                            <img src={item.src} alt={item.alt} className="w-10 h-auto" />
                        </button>
                    ) : null
                );
            })}
        </div>
    );

    return (
        <FadeIn duration={0.5}>
            <footer className={clsx(className, "w-full h-auto text-tertiari bottom-0 relative p-8 bg-secondary shadow-angelic-white")}>
                <FadeIn duration={1.0}>
                    {isConnected ? (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                                <div className="flex flex-col items-center text-left md:m-1/4">
                                    <h2 className="font-bold text-2xl mb-4">{t('Développeur')}</h2>
                                    <ul className="space-y-4">
                                        <li className="hover:underline"><a href={EVENT} id="entrepriseAchat">{t('Evenement')}</a></li>
                                        <li className="hover:underline"><a href={TOURNAMENT} id="entrepriseAchat">{t('Tournois')}</a></li>
                                        <li className="hover:underline"><a href={RANKING} id="entrepriseAchat">{t('Classement')}</a></li>
                                    </ul>
                                </div>
                                <div className="flex flex-col items-center text-left md:m-1/4">
                                    <h2 className="font-bold text-2xl mb-4">{t('Entreprise')}</h2>
                                    <ul className="space-y-4">
                                        <li className="hover:underline"><a href={ENTREPRISE} id="entrepriseAchat">{t('entreprise')}</a></li>
                                    </ul>
                                </div>
                                <div className="flex flex-col items-center  text-left md:m-1/4">
                                    <h2 className="font-bold text-2xl mb-4">{t('Société')}</h2>
                                    <ul className="space-y-4">
                                        <li className="hover:underline"><a href="#">{t('À propos')}</a></li>
                                        <li className="hover:underline"><a href={PRIVACY_POLICY}>{t('politiqueConfidentialite')}</a></li>
                                        <li className="hover:underline"><a href={LEGAL}>{t('mentionLegal')}</a></li>
                                        <li className="hover:underline"><a href={TERMS}>{t('cgv')}</a></li>
                                    </ul>
                                </div>

                            </div>
                            
                            <div className="flex flex-col items-center justify-center text-center">
                                <h2 className="font-bold text-2xl mb-4">{t('retrouverNous')}</h2>
                                <div className="flex space-x-4 mb-4 relative justify-center">
                                    <button
                                        onClick={() => { window.location.href = 'https://facebook.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#316FF6] text-white hover:bg-[#2558b1] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/facebook.svg" alt="Facebook" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">Facebook</span>
                                    </button>
                                    <button
                                        onClick={() => { window.location.href = 'https://x.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#1DA1F2] text-white hover:bg-[#1A91DA] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/x.svg" alt="X" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">X</span>
                                    </button>
                                    <button
                                        onClick={() => { window.location.href = 'https://discord.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#7289da] text-white hover:bg-[#5A73B5] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/discord.svg" alt="Discord" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">Discord</span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <img src={iconeMail} alt="icone de mail" className="mr-3" />
                                    <span>{MAIL}</span>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                            <div className="flex flex-col items-center  text-left md:m-1/4">
                                <h2 className="font-bold text-2xl mb-4">{t('Société')}</h2>
                                <ul className="space-y-4">
                                    <li className="hover:underline"><a href="#">{t('À propos')}</a></li>
                                    <li className="hover:underline"><a href={PRIVACY_POLICY}>{t('politiqueConfidentialite')}</a></li>
                                    <li className="hover:underline"><a href={LEGAL}>{t('mentionLegal')}</a></li>
                                    <li className="hover:underline"><a href={TERMS}>{t('cgv')}</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center  text-left md:m-1/4">
                                <h2 className="font-bold text-2xl mb-4">{t('retrouverNous')}</h2>
                                <div className="flex space-x-4 mb-4 relative justify-center">
                                    <button
                                        onClick={() => { window.location.href = 'https://facebook.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#316FF6] text-white hover:bg-[#2558b1] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/facebook.svg" alt="Facebook" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">Facebook</span>
                                    </button>
                                    <button
                                        onClick={() => { window.location.href = 'https://x.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#1DA1F2] text-white hover:bg-[#1A91DA] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/x.svg" alt="X" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">X</span>
                                    </button>
                                    <button
                                        onClick={() => { window.location.href = 'https://discord.com'; }}
                                        className="group flex justify-center p-2 rounded-full drop-shadow-xl bg-[#7289da] text-white hover:bg-[#5A73B5] transition-all duration-300 relative"
                                    >
                                        <img src="/assets/discord.svg" alt="Discord" />
                                        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 bg-primary text-white rounded px-1 py-0.5">Discord</span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <img src={iconeMail} alt="icone de mail" className="mr-3" />
                                    <span>{MAIL}</span>
                                </div>
                            </div>
                        </div>
                    )}
               </FadeIn>
                <div className="mx-auto border-t-2 border-tertiari w-2/3 mt-8"></div>
                <div className="mt-8 text-center flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-4 md:mb-0 flex-1 text-center">Copyright © {new Date().getFullYear()} CodeArena</p>
                    <div className="flex justify-center md:justify-end">
                        <NavFlagsComponent />
                    </div>
                </div>
            </footer>
        </FadeIn>
    );
};

export default Footer;
