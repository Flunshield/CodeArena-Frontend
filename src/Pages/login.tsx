// LoginPage.tsx

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../AuthContext.tsx";
import {login} from "../Helpers/apiHelper.ts";
import {LoginForm} from "../Interface/Interface.ts";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import tree from "../assets/tree.svg";
import {useTranslation} from "react-i18next";
import Label from "../ComposantsCommun/Label.tsx";
import Button from "../ComposantsCommun/Button.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import clsx from "clsx";


const LoginPage: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [errorUserName, setErrorUsername] = useState<boolean | null>(false)
    const [errorPassword, setErrorPassword] = useState<boolean | null>(false)
    const navigate = useNavigate();
    const { t } = useTranslation();

    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data: LoginForm = {
                userName: userName,
                password: password
            }

            if(userName && password) {
                setErrorUsername(false)
                setErrorPassword(false)
                const response = await login('auth/login', data)

                if (response.ok) {
                    window.location.reload();
                } else {
                    setError(t('errorNdcMdp'));
                }
            } else if (!userName && !password) {
                setErrorUsername(true)
                setErrorPassword(true)
                setError(t('ndcMdpMandatory'));
            } else if (!userName) {
                setErrorUsername(true)
                setErrorPassword(false)
                setError(t('ndcMandatory'));
            } else if(password === "") {
                setErrorPassword(true)
                setErrorUsername(false)
                setError(t('mdpMandatory'));
            }
        } catch (error) {
            setError('Erreur lors de la connexion. Veuillez réessayer.');
            console.error(error);
        }
    };
    useEffect(() => {
        if (isConnected) {
            navigate("/");
        }
    }, [isConnected]);

    return (
        <Layout>
            {!isConnected &&
                <div className="flex flex-row justify-around">
                    <div className="relative left-1/3 flex items-center ">
                        <div>
                            <Card className="mt-32 rounded-none w-96">
                                <CardContent className="bg-tertiari text-white w-96 pb-6 pt-6">
                                    <div className="mt-2 mb-2">
                                        <div className="flex flex-col mb-5 text-center font-bold">
                                        <p id="titleConnect" className="text-3xl text-primary">{t('signIntoCodeArena')}</p>
                                        {error && <p className="text-error mt-2">{error}</p>}
                                        </div>
                                        <form onSubmit={handleSubmit} className="pr-12 pl-12">
                                            <Label id={"userName"} className="flex flex-col font-bold text-primary">
                                                {t('userName')}
                                                <input
                                                    id="userName"
                                                    className={clsx(errorUserName && "border-error border-4", "h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300")}
                                                    placeholder={t('userName')}
                                                    type="text"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </Label>
                                            <br/>
                                            <Label id={"password"} className="flex flex-col font-bold text-primary">
                                                {t('password')}
                                                <input
                                                    id="password"
                                                    className={clsx(errorPassword && "border-error border-4", "h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300")}
                                                    type="password"
                                                    placeholder={t('password')}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Label>
                                            <br/>
                                            <div className="flex flex-col justify-center mt-10">
                                                <Button type="submit" id="connect"
                                                        className="bg-secondary w-full h-12 rounded-md uppercase">
                                                    {t('connect')}
                                                </Button>
                                                <div className="flex flex-col mt-5">
                                                    <a href="/forgotPassword"
                                                       className="text-center text-primary">{t('forgotPassword')}</a>
                                                    <a href="/signUp"
                                                       className="text-center text-primary">{t('register')}</a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <img
                        className="bg-primary ml-auto"
                        src={tree}
                        alt="arbre design"
                    />
                </div>
            }
            {isConnected &&
                <p>You are déja connected !</p>
            }
        </Layout>
    );
};

export default LoginPage;
