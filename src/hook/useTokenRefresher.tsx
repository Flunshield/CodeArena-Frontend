import {useEffect, useState} from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {VITE_API_BASE_URL_BACK} from "../Helpers/apiHelper.ts";

export interface AuthHookProps {
    accessToken?: string | undefined;
    connected?: boolean | undefined;
    infosUser?: JwtPayload | string;
    fetchData?: () => Promise<void>;
}

const useAuth = ({accessToken}: AuthHookProps) => {
    const [authState, setAuthState] = useState<AuthHookProps | null>(() => {
        // Charger les données depuis localStorage lors du montage du composant
        const storedAuthState = localStorage.getItem('authState');
        return storedAuthState ? JSON.parse(storedAuthState) : null;
    });

    const fetchData = async (): Promise<void> => {
        try {
            // Vérifier si le jeton d'accès est expiré ou valide
            let isAccessTokenValid: string | JwtPayload = '';
            if (accessToken) {
                isAccessTokenValid = jwtDecode(accessToken);
            }
            if (isAccessTokenValid) {
                setAuthState((prevState) => ({
                    ...prevState,
                    accessToken: accessToken,
                    infosUser: isAccessTokenValid,
                    connected: true,
                }));
            } else {
                // Si le jeton d'accès est expiré ou non fourni, demander un nouveau jeton avec le rafraîchissement
                const newAccessToken = await refreshAccessToken();
                let isAccessTokenValid: JwtPayload | undefined = undefined;
                if (newAccessToken) {
                    isAccessTokenValid = jwtDecode(newAccessToken);
                    setAuthState((prevState) => ({
                        ...prevState,
                        infosUser: isAccessTokenValid,
                        accessToken: newAccessToken,
                        connected: true,
                    }));
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données d\'authentification', error);
        }
    };

    const refreshAccessToken = async (): Promise<string> => {
        try {
            // Effectuer la requête pour rafraîchir le jeton d'accès avec fetch
            const response = await fetch(`${VITE_API_BASE_URL_BACK}/auth/refresh-access-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                return '';
            }

            const data = await response.json();
            return data.accessToken;
        } catch (error) {
            console.error('Erreur lors du rafraîchissement du jeton d\'accès', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchData().then(r => r);
    }, [accessToken]); // Déclencher le chargement lorsque le jeton d'accès change

    // Effet pour sauvegarder les données dans localStorage lorsqu'elles changent
    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

    return authState;
};

export default useAuth;
