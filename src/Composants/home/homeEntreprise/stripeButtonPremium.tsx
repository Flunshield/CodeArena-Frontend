import React, {useEffect} from 'react';

const StripeButtonPremium: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/buy-button.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <p>coucou</p>
    );
};

export default StripeButtonPremium;
