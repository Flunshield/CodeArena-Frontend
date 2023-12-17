import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import useAuth, { AuthHookProps } from "./hook/useTokenRefresher.tsx";

interface AuthContextProps extends AuthHookProps {
    fetchData?: () => Promise<void>;
}

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
    const authState: AuthHookProps | null | undefined = useAuth({});

    useEffect(() => {
        authState?.fetchData?.(); // Appel de la fonction fetchData si elle existe
    }, [authState]);

    return (
        <AuthContext.Provider value={{ ...authState }}>
            {children}
        </AuthContext.Provider>
    );
};
