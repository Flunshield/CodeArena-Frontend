import React from 'react';
import { Link } from 'react-router-dom'; // Changer l'importation
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

// Ajout de la déclaration pour FooterProps
interface FooterProps {
    className?: string;
}

// Assurez-vous que le composant Logo est correctement importé ou défini
const Logo = ({ className }: { className?: string; fillOnHover?: boolean }) => (
    <div className={className}>
        <img src="/logo.svg" alt="Logo" className='w-16' />
    </div>
);

const NavFlagsComponent = () => {
    const { i18n } = useTranslation();
    const navItems: NavFlags[] = [
        { src: drapFr, value: 'fr', displayLink: true, alt: 'drapeau français' },
        { src: drapEn, value: 'en', displayLink: true, alt: 'drapeau anglais' },
    ];

    const handleChangeLanguage = async (language: string) => {
        await changeLanguage(language);
        await i18n.reloadResources();
    };

    return (
        <div className="flex space-x-4">
            {navItems.map((item) => {
                const isActive = i18n.language === item.value;
                return (
                    item.displayLink && (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => handleChangeLanguage(item.value)}
                            className={clsx("transition-transform duration-300 transform hover:scale-110", {
                                "opacity-50": isActive,
                            })}
                        >
                            <img src={item.src} alt={item.alt} className="w-10 h-auto" />
                        </button>
                    )
                );
            })}
        </div>
    );
};
const socialMediaProfiles = [
    { title: 'Facebook', href: 'https://facebook.com', icon: '/assets/facebook.svg', bgColor: '#316FF6', hoverColor: '#2558b1' },
    { title: 'X', href: 'https://x.com', icon: '/assets/x.svg', bgColor: '#1DA1F2', hoverColor: '#1A91DA' },
    { title: 'Discord', href: 'https://discord.com', icon: '/assets/discord.svg', bgColor: '#7289da', hoverColor: '#5A73B5' },
];
function Navigation() {

    const { t } = useTranslation();

    const navigation = [
        {
            title: t('Développeur'),
            links: [
                { title: t('event'), href: EVENT },
                { title: t('tournaments'), href: TOURNAMENT },
                { title: t('ranking'), href: RANKING },
            ],
        },
        {
            title: t('entreprise'),
            links: [
                { title: t('entreprise'), href: ENTREPRISE },
            ],
        },
        {
            title: t('Société'),
            links: [
                { title: t('A propos'), href: '#' },
                { title: t('politiqueConfidentialite'), href: PRIVACY_POLICY },
                { title: t('mentionLegal'), href: LEGAL },
                { title: t('cgv'), href: TERMS },
            ],
        },
    ];

    return (
        <nav>
            <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {navigation.map((section, sectionIndex) => (
                    <li key={sectionIndex}>
                        <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                            {section.title}
                        </div>
                        <ul role="list" className="mt-4 text-sm text-neutral-700">
                            {section.links.map((link, linkIndex) => (
                                <li key={linkIndex} className="mt-4">
                                    <Link to={link.href} className="transition hover:text-neutral-950">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


function NewsletterForm() {
    const { t } = useTranslation();

    return (
        <form className="max-w-sm">
            <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                {t('inscrivez_vous_à_notre_newsletter')}
            </h2>
            <p className="mt-4 text-sm text-neutral-700">
                {t('abonnez_vous_pour_recevoir_les_dernières_nouvelles_articles_ressources_et_inspirations')}
            </p>
            <div className="relative mt-6">
                <input
                    type="email"
                    placeholder={t('adresse_email')}
                    autoComplete="email"
                    aria-label={t('adresse_email')}
                    className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                />
                <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button
                        type="submit"
                        aria-label={t('submit')}
                        className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                    >


                    </button>
                </div>
            </div>
        </form>
    );
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <FadeIn duration={0.5}>
            <footer className={clsx(className, "w-full text-secondary bottom-0 relative p-8 shadow-angelic-white")}>
                <FadeIn duration={1.0}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                        <Navigation />
                        <div className="flex lg:justify-end">
                            <div className="flex flex-col items-center justify-center text-center">
                                <h2 className="font-bold text-2xl mb-4">{t('retrouverNous')}</h2>
                                <div className="flex space-x-4 mb-4 relative justify-center">
                                    {socialMediaProfiles.map((profile) => (
                                        <button
                                            key={profile.title}
                                            onClick={() => { window.location.href = profile.href; }}
                                            style={{ backgroundColor: profile.bgColor }}
                                            className="group flex justify-center p-2 rounded-full drop-shadow-xl transition-all duration-300 relative"
                                        >
                                            <img src={profile.icon} alt={profile.title} />
                                            <span
                                                style={{ backgroundColor: profile.bgColor }}
                                                className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:translate-y-[-24px] group-hover:scale-110 duration-500 text-secondary rounded px-1 py-0.5"
                                            >
                                                {profile.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
                        <Link to="/" aria-label="Home">
                            <Logo className="h-8" fillOnHover />
                        </Link>
                        <p className="text-sm text-neutral-700">
                            © CodeArena {new Date().getFullYear()}
                        </p>
                    </div>
                </FadeIn>

                <div className="mx-auto border-t-2 border-tertiari w-2/3 mt-8"></div>
                <div className="mt-8 text-center flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-4 md:mb-0 flex-1 text-center">© {new Date().getFullYear()} CodeArena</p>
                    <div className="flex justify-center md:justify-end">
                        <NavFlagsComponent />
                    </div>
                </div>
            </footer>
        </FadeIn>
    );
};

export default Footer;