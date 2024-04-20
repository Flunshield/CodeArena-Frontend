import React from 'react';
import logo from '/assets/logo.svg';
import iconeMail from '/assets/iconeMail.png';
import {useTranslation} from "react-i18next";
import {ENTREPRISE, LEGAL, MAIL, PRIVACY_POLICY, TERMS} from "../constantes/constantes.ts";
import facebook from "/assets/facebook.png";
import twitter from "/assets/twitter.png";
import discord from "/assets/discord.png"
import {NavFlags} from "../Interface/Interface.ts";
import {useAuthContext} from "../AuthContext.tsx";
import drapFr from "/assets/drapeaux/fr.png";
import drapEn from "/assets/drapeaux/gb.png";
import {changeLanguage} from "../i18n.ts";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
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
                    // Ajoutez une clé unique pour chaque élément
                    <button key={item.value} type="button" onClick={() => handleChangeLanguage(item.value)} className="mr-3">
                        <img src={"../"+item.src} alt={item.alt} className="w-10 h-auto" />
                    </button>
                ) : null
            )}
        </div>)

  return (
      <footer className="w-full text-tertiari p-4 z-0 bg-secondary">
          <div className="flex mb-3 flex-col md:flex-row md:justify-between">
              <div className="max-lg:hidden">
                  <img
                      className=""
                      src={logo}
                      alt="logo du site web"/>
              </div>
              {isConnected &&
              <div className="mt-5 md:flex-col ">
                  <p className="font-bold text-2xl">{t('CodeArena')}</p>
                  <p className="mt-5 hover:underline"><a href={ENTREPRISE}>{t('entreprise')}</a></p>
                  <p className="mt-5 hover:underline"><a href="">{t('partenaire')}</a></p>
              </div>
              }
              <div className="md:flex-col mt-5">
                  <ul>
                  <li className="font-bold text-2xl">{t('contact')}</li>
                  <li className="mt-5 flex md:justify-between"><img src={iconeMail} alt="icone de mail" className="mr-5"/>{MAIL}</li>
                  <li className="mt-10 hover:underline"><a href={PRIVACY_POLICY}>{t('politiqueConfidentialite')}</a></li>
                  <li className="mt-2 hover:underline"><a href={LEGAL}>{t('mentionLegal')}</a></li>
                  <li className="mt-2 hover:underline"><a href={TERMS}>{t('cgv')}</a></li>
                  </ul>
              </div>
              <div className="flex-col mt-5">
                  <p className="font-bold text-2xl">{t('retrouverNous')}</p>
                  <div className="flex mt-10 justify-around">
                      <img
                          className="h-8 w-8 cursor-pointer"
                          src={facebook}
                          alt="logo de facebook"/>
                      <img
                          className="h-8 w-8 cursor-pointer"
                          src={twitter}
                          alt="logo de twitter"/>
                      <img
                          className="h-8 w-8 cursor-pointer"
                          src={discord}
                          alt="logo de discord"/>
                  </div>
              </div>
              <div className="flex-col mt-24 md:mt-10">
                  <NavFlagsComponent />
              </div>
          </div>
          <div className="mt-16">
              <p>copyright © {new Date().getFullYear()} codeArena</p>
          </div>
      </footer>
  );
};

export default Footer;
