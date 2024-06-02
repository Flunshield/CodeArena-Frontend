import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../Interface/Interface.ts";
import {GROUPS} from "../constantes/constantesRoutes.ts";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRouteAdmin: React.FC<PrivateRouteProps> = ({ children }) => {
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const isAdmin = infos.data.groups.roles
    // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    if (isAdmin !== GROUPS.ADMIN) {
        return <Navigate to="/myAccount" />;
    }

    // Rendu normal si l'utilisateur est connecté
    return children;
};

export default PrivateRouteAdmin;
