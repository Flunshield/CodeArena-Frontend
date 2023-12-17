// LoginPage.tsx

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "./AuthContext.tsx";

interface LoginForm {
    userName: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    userName,
                    password,
                } as LoginForm),
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            setError('Erreur lors de la connexion. Veuillez réessayer.');
            console.error(error);
        }
    };
    useEffect(() => {
        if(isConnected) {
            navigate("/home");
        }
    }, [isConnected]);

    return (
        <>
            { !isConnected &&
                    <div>
                        <h1>Page de Connexion</h1>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nom utilisation:
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </label>
                            <br/>
                            <label>
                                Mot de passe:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <br/>
                            <button type="submit">Se connecter</button>
                        </form>
                    </div>
            }
            {isConnected &&
            <p>You are déja connected !</p>
            }
        </>
    );
};

export default LoginPage;
