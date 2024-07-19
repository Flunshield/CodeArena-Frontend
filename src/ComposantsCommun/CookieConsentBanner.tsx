import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {getCookie, setCookie} from "../Helpers/methodeHelper.ts";

const CookieConsentBanner = () => {
    const [consentGiven, setConsentGiven] = useState(false);
    const {t} = useTranslation();

    // Fonction pour accepter les cookies
    const acceptCookies = () => {
        setCookie('cookieConsent', 'true', 365);
        setConsentGiven(true);
    };

    const refuseCookies = () => {
        setCookie('cookieConsent', 'false', 365);
        setConsentGiven(true);
    }

    useEffect(() => {
        const cookieGivenYet = getCookie('cookieConsent');

        if(cookieGivenYet) {
            setConsentGiven(true);
        }
    }, []);

    return (
        !consentGiven && (
            <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-tertiari p-4 text-center z-50">
                <p className="mb-5">{t('utiliseCookiePrevent')}</p>
                <div className="max-md:flex-col flex justify-center items-center">
                    <div>
                    <button onClick={acceptCookies}
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-tertiari font-bold py-2 px-4 rounded">
                        Accepter
                    </button>
                    <button onClick={refuseCookies}
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-tertiari font-bold py-2 px-4 rounded">
                        Refuser
                    </button>
                </div>
                    <a href="/politique-de-cookies" className="max-md:mt-5 ml-4 text-blue-300 hover:text-blue-500">En savoir
                        plus</a>
                </div>
            </div>
        )
    );
};

export default CookieConsentBanner;
