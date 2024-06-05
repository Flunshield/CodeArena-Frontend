import React, { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info' | string;
    onClose: () => void;
    delay?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, delay = 1000 }) => {
    // Utilisez le state pour contrôler les classes CSS qui gèrent l'animation
    const [notificationClass, setNotificationClass] = useState('translate-x-full');

    useEffect(() => {
        // Déclenchez l'animation d'entrée immédiatement après le montage du composant
        setNotificationClass('translate-x-0');

        // Définissez un timeout pour réinitialiser le state et déclencher l'animation de sortie
        const timeoutId = setTimeout(() => {
            setNotificationClass('translate-x-full'); // Déclenchez l'animation de sortie
            // Attendre que l'animation de sortie se termine avant d'appeler onClose
            setTimeout(onClose, 500); // L'animation dure 500ms
        }, delay); // La notification reste visible pendant 3 secondes

        // Nettoyez le timeout si le composant est démonté prématurément
        return () => {
            clearTimeout(timeoutId);
        };
    }, [onClose]);

    const backgroundColor = {
        success: 'bg-olive-green',
        error: 'bg-[#D63864]',
        info: 'bg-light-blue'
    }[type] || 'bg-gray-500';

    return (
        <div className={`fixed z-50 top-5 right-0 m-5 p-4 rounded shadow-lg text-white transform transition-all duration-500 ease-out ${notificationClass} ${backgroundColor}`}>
            <span>{message}</span>
        </div>
    );
};

export default Notification;
