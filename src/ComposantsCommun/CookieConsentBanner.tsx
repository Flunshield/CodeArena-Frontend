import {useEffect, useState} from 'react';

const CookieConsentBanner = () => {
    const [consentGiven, setConsentGiven] = useState(false);

    // Fonction pour accepter les cookies
    const acceptCookies = () => {
        setConsentGiven(true);
        window.localStorage.setItem('cookieConsent', String("cookieConsent"));
    };

    useEffect(() => {
        const hasGivenConsent = window.localStorage.getItem('cookieConsent');
        if (hasGivenConsent) {
            setConsentGiven(true);
        }
    }, []);
    return (
        !consentGiven && (
            <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 text-center z-50">
                <p>
                    Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez notre utilisation des cookies.
                    <button onClick={acceptCookies} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Accepter
                    </button>
                    <a href="/politique-de-cookies" className="ml-4 text-blue-300 hover:text-blue-500">En savoir plus</a>
                </p>
            </div>
        )
    );
};

export default CookieConsentBanner;
