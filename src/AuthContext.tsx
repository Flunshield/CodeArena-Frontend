import React, { createContext, ReactNode, useContext } from 'react';
import useAuth, { AuthHookProps } from './hook/useTokenRefresher.tsx';

export interface AuthContextProps extends AuthHookProps {}

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext doit être utilisé à l\'intérieur d\'un AuthContextProvider');
    }

    return context;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const authState = useAuth();

    return (
        <AuthContext.Provider value={{ ...authState }}>
            {children}
        </AuthContext.Provider>
    );
};
