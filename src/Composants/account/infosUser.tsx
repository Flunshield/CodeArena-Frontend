import map from "/assets/iconeProfile/map-marker.png";
import company from "/assets/iconeProfile/company.png";
import school from "/assets/iconeProfile/school.png";
import github from "/assets/iconeProfile/github.png";
import link from "/assets/iconeProfile/link.png";
import titles from "/assets/iconeProfile/flag.png";
import Button from "../../ComposantsCommun/Button.tsx";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import React from "react";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import ListItem from "../../ComposantsCommun/ListItem.tsx";

interface InfosUserProps {
    openPopup: () => void;
}

const InfosUser: React.FC<InfosUserProps> = ({openPopup}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();

    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const emailVerified = infos.data.emailVerified
    const title = infos?.data?.titles?.label as unknown as string
    const [isSendMail, setIsSendMail] = React.useState<boolean>(false);

    const valdMail = async () => {
        const response = await postElementByEndpoint('user/validMail', {
            token: authContext.accessToken ?? "",
            data: infos.data
        })

        if (response.status === 201) {
            setIsSendMail(true);
            alert("Mail envoyé");
        } else {
            alert("Erreur lors de l'envoie du mail de validation de l'adresse mail");
        }
    }

    return (
        <>
            <div className="m-auto flex flex-col items-center justify-center text-tertiari">
                <div className="mt-10 text-center">
                    <p className="text-tertiary mb-1 uppercase font-bold text-xl">{infos.data.firstName && infos.data.lastName ? `${infos.data.firstName} ${infos.data.lastName}` : infos.data.userName}</p>
                    <p className="text-gray-600 mb-5 uppercase font-bold text-xl">{infos.data.firstName && infos.data.lastName ? infos.data.userName : ""}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-around text-tertiary m-5 p-5 border-2 rounded-lg">
                    <ul className="mb-5 md:mb-0">
                        <ListItem icon={map} id="map" text={infos.data.localisation ?? ""}/>
                        <ListItem icon={company} id="company" text={infos.data.company ?? ""}/>
                        <ListItem icon={school} id="school" text={infos.data.school ?? ""}/>
                    </ul>
                    <ul>
                        <ListItem icon={github} id="github" text={infos.data.github ?? ""}/>
                        <ListItem icon={link} id="link" text={infos.data.url ?? ""}/>
                        <ListItem icon={titles} id="titles" text={title ? title : "Aucun titre"}/>
                    </ul>
                </div>
                <Button type="button" onClick={openPopup}
                        className="border-2 bg-tertiary rounded-lg text-tertiary p-2 w-40"
                        id="save">
                    {t("update")}
                </Button>
            </div>
            <div>
                {!emailVerified && (
                    <div className="flex flex-col md:flex-row justify-center items-center mb-5">
                        <div className="flex flex-col md:flex-row items-center mb-3 md:mb-0">
                            <p className="text-tertiary text-center bg-error rounded-lg p-2 w-36 mr-3">{t("emailNotVerified")}</p>
                            {!isSendMail && (
                                <Button id="button-valid-mail" type="button" onClick={valdMail}
                                        className="h-auto w-40 border-2 rounded-lg p-2 bg-green-800 text-tertiary">{t("validMail")}</Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default InfosUser;