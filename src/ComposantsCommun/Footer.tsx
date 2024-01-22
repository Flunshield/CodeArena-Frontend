import React from 'react';
import logo from '../assets/logo.png';
import iconeMail from '../assets/iconeMail.png';
import {useTranslation} from "react-i18next";
import {MAIL} from "../constantes.ts";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import discord from "../assets/discord.png"
import {NavFlags} from "../Interface/Interface.ts";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
    const { t, i18n } = useTranslation();

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
        </div>)

  return (
      <footer className="w-full text-white p-4 z-0 bg-secondary">
          <div className="flex mb-3 justify-between">
              <div>
                  <img
                      className=""
                      src={logo}
                      alt="logo du site web"/>
              </div>
              <div className="flex-col mt-5">
                  <p className="font-bold text-2xl">{t('CodeArena')}</p>
                  <p className="mt-5 hover:underline"><a href="">{t('entreprise')}</a></p>
                  <p className="mt-2 hover:underline"><a href="">{t('partenaire')}</a></p>
              </div>
              <div className="flex-col mt-5">
                  <p className="font-bold text-2xl">{t('contact')}</p>
                  <p className="mt-5 flex justify-between"><img src={iconeMail} alt="icone de mail"/>{MAIL}</p>
                  <p className="mt-10 hover:underline"><a href="">{t('politiqueConfidentialite')}</a></p>
                  <p className="mt-2 hover:underline"><a href="">{t('mentionLegal')}</a></p>
                  <p className="mt-2 hover:underline"><a href="">{t('cgv')}</a></p>
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
              <div className="flex-col mt-5">
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
