// src/contexts/NotificationContext.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
    notification: Notification | null;
    setNotification: (notification: Notification | null) => void;
}

interface NotificationProviderProps {
    children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
