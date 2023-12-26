import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../AuthContext.tsx";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authContext = useAuthContext();

    // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    if (!authContext.connected) {
        return <Navigate to="/login" />;
    }

    // Rendu normal si l'utilisateur est connecté
    return children;
};

export default PrivateRoute;
