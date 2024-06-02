import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { VITE_API_BASE_URL_BACK } from "../Helpers/apiHelper.ts";

export interface AuthHookProps {
    accessToken?: string;
    connected?: boolean;
    infosUser?: JwtPayload | string;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthHookProps | null>(() => {
        const storedAuthState = localStorage.getItem('authState');
        return storedAuthState ? JSON.parse(storedAuthState) : null;
    });
    const [timeToRefresh, setTimeToRefresh] = useState<number>(0);

    const refreshAccessToken = async () => {
        try {
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
            console.error('Failed to refresh access token', error);
            return '';
        }
    };

    const checkAndRefreshToken = async () => {
        const currentAuthState = authState;
        if (currentAuthState?.accessToken) {
            const jwtDecoded = jwtDecode(currentAuthState.accessToken);
            const currentTime = parseInt((Date.now() / 1000).toFixed(0));
            const timeLeft = ((jwtDecoded.exp ?? 0) - currentTime);

            if (timeLeft > 10) {
                setTimeToRefresh((timeLeft - 10) * 1000); // Convert to milliseconds
            } else {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    const newJwtDecoded = jwtDecode(newAccessToken);
                    setAuthState({
                        accessToken: newAccessToken,
                        connected: true,
                        infosUser: newJwtDecoded,
                    });
                    localStorage.setItem('authState', JSON.stringify({
                        accessToken: newAccessToken,
                        connected: true,
                        infosUser: newJwtDecoded,
                    }));
                    const newTimeLeft = (newJwtDecoded.exp ?? 0) - parseInt((Date.now() / 1000).toFixed(0));
                    setTimeToRefresh(newTimeLeft * 1000); // Convert to milliseconds
                } else {
                    setAuthState(null);
                    setTimeToRefresh(0);
                }
            }
        }
    };

    useEffect(() => {
        checkAndRefreshToken();
        const interval = setInterval(() => {
            checkAndRefreshToken();
        }, timeToRefresh);
        return () => clearInterval(interval);
    }, [authState?.accessToken, timeToRefresh]);

    return authState;
};

export default useAuth;
