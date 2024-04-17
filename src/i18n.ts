// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import {API_BASE_URL} from "./Helpers/apiHelper.ts";

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: 'fr', // Langue par défaut
        fallbackLng: 'fr', // Langue de secours en cas de problème
        keySeparator: false, // Ne pas utiliser le séparateur '__' dans les clés de traduction
        interpolation: {
            escapeValue: false, // Ne pas échapper les valeurs HTML
        },
        backend: {
            loadPath: `${API_BASE_URL}/traduction?pma_lang={{lng}}`, // Chemin vers le fichier de traduction
        },
    });

export default i18n;
export const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
};
