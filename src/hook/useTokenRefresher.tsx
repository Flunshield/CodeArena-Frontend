import {useEffect, useState} from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';

export interface AuthHookProps {
    accessToken?: string | undefined;
    infosUser?: string | JwtPayload;
    fetchData?: () => Promise<void>;
    connected?: boolean;
}

const useAuth = ({ accessToken }: AuthHookProps) => {
    const [authState, setAuthState] = useState<AuthHookProps | null>();

    const fetchData = async (): Promise<void> => {
            // Vérifier si le jeton d'accès est expiré ou valide
            let isAccessTokenValid: string | JwtPayload = "";
            if(accessToken) {
                isAccessTokenValid = jwtDecode(accessToken);
            }
            if (isAccessTokenValid) {
                setAuthState({
                    accessToken: accessToken,
                    infosUser: isAccessTokenValid,
                    connected: true
                });
            } else {
                    // Si le jeton d'accès est expiré ou non fourni, demander un nouveau jeton avec le rafraîchissement
                    const newAccessToken = await refreshAccessToken();
                    let isAccessTokenValid = undefined;
                    if(newAccessToken) {
                        isAccessTokenValid = jwtDecode(newAccessToken);
                        setAuthState({
                            infosUser: isAccessTokenValid,
                            accessToken: newAccessToken,
                            connected: true
                        });
                    }
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
                return "";
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
    }, []);

    return authState;
};

export default useAuth;
