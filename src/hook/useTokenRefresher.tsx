import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface AuthHookProps {
    accessToken?: string | undefined;
    infosUser?: string | JwtPayload;
    fetchData?: () => Promise<void>;
    connected?: boolean;
}

const useAuth = ({ accessToken }: AuthHookProps) => {
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
                setAuthState({
                    accessToken: accessToken,
                    infosUser: isAccessTokenValid,
                    connected: true,
                });
            } else {
                // Si le jeton d'accès est expiré ou non fourni, demander un nouveau jeton avec le rafraîchissement
                const newAccessToken = await refreshAccessToken();
                let isAccessTokenValid = undefined;
                if (newAccessToken) {
                    isAccessTokenValid = jwtDecode(newAccessToken);
                    setAuthState({
                        infosUser: isAccessTokenValid,
                        accessToken: newAccessToken,
                        connected: true,
                    });
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données d\'authentification', error);
        }
    };

    const refreshAccessToken = async (): Promise<string> => {
        try {
            // Effectuer la requête pour rafraîchir le jeton d'accès avec fetch
            const response = await fetch('http://localhost:3000/auth/refresh-access-token', {
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
        fetchData();
    }, [accessToken]); // Déclencher le chargement lorsque le jeton d'accès change

    // Effet pour sauvegarder les données dans localStorage lorsqu'elles changent
    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

    return authState;
};

export default useAuth;
