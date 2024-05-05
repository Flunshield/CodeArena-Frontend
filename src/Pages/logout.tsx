import {useEffect, useState} from "react";
import {useAuthContext} from "../AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {logout} from "../Helpers/apiHelper.ts";

export function LogoutPage() {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const logoutFunction = async () => {
        try {
            const response = await logout('auth/logout')

            if (response.ok) {
                //On n'oublie pas de supprimer notre localStorage et de recharger la page
                localStorage.removeItem('authState');
                window.location.reload();
            }
        } catch (error) {
            setError('Erreur lors de la déconnexion. Veuillez réessayer.');
            console.error(error);
        }
    }

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        }
        if (isConnected) {
            logoutFunction();
        }
    }, [isConnected]);

    return (<>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
}