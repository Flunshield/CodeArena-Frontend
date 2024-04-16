import Layout from "../../ComposantsCommun/Layout.tsx";
import {useLocation} from "react-router-dom";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {useEffect, useState} from "react";
import Card from "../../ComposantsCommun/Card.tsx";

const Success = () => {
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const sessionId = params.get('session_id');
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken

    const [isError, setIsError] = useState(false);
    const [isCodeError, setIsCodeError] = useState(0);

    useEffect(() => {
            postElementByEndpoint('stripe/success', {
                token: authContext.accessToken ?? "",
                data: {sessionId: sessionId ?? "", user: infos}
            })
                .then(response => {
                    return response.status;
                })
                .then(data => {
                    if (data === 201) {
                        window.location.href = "/";
                    } else {
                        setIsError(true);
                        setIsCodeError(data);
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du message :", error);
                    // Traitez les erreurs ici
                });
    }, []);


    return (
        <Layout>
            <div className="m-64 text-center">
                {isError ?
                    <Card className="bg-secondary text-white p-32">
                        <h1 className="text-2xl mb-10">Erreur lors de la transaction</h1>
                        <p> Veuillez contacter le support. (Code erreur {isCodeError})</p>
                    </Card>
                    :
                    <Card className="bg-secondary text-white p-32">
                        <h1 className="text-white">Vous allez être redirigé</h1>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p> Si vous n'êtes pas redirigé, vous pouvez cliquez sur ce <a href={"/"}
                                                                                       className="text-blue-700">lien.</a>
                        </p>
                    </Card>
                }
            </div>
        </Layout>
    );
}

export default Success;