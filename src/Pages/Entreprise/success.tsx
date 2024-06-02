import Layout from "../../ComposantsCommun/Layout.tsx";
import {useLocation} from "react-router-dom";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {useEffect, useState} from "react";
import Card from "../../ComposantsCommun/Card.tsx";
import {useTranslation} from "react-i18next";

function Success (){
    const {search} = useLocation();
    const {t} = useTranslation();
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
            });
    }, []);


    return (
        <Layout>
            <div className="m-64 text-center">
                {isError ?
                    <Card className="bg-secondary text-tertiari p-32">
                        <h1 className="text-2xl mb-10">{t("erreurTransac")}</h1>
                        <p> {t("contactSupport")} {isCodeError})</p>
                    </Card>
                    :
                    <Card className="bg-secondary text-tertiari p-32">
                        <h1 className="text-tertiari">{t("redirection")}</h1>
                        <p> {t("msgRedirectionLink")} <a href={"/"} className="text-blue-700">{t("link")}.</a>
                        </p>
                    </Card>
                }
            </div>
        </Layout>
    );
}

export default Success;