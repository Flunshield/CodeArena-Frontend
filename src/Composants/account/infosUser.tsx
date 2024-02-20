import map from "../../assets/iconeProfile/map-marker.png";
import company from "../../assets/iconeProfile/company.png";
import school from "../../assets/iconeProfile/school.png";
import github from "../../assets/iconeProfile/github.png";
import link from "../../assets/iconeProfile/link.png";
import titles from "../../assets/iconeProfile/flag.png";
import Button from "../../ComposantsCommun/Button.tsx";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import React from "react";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";

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
        <div className="ml-28 mb-10 flex flex-col">
            <div className="">
                <p className="text-white mb-1 uppercase font-bold text-xl ml-2">{infos.data.firstName && infos.data.lastName ? infos.data.firstName + " " + infos.data.lastName : infos.data.userName}</p>
                <p className="text-gray-600 mb-5 uppercase font-bold text-xl">{infos.data.firstName && infos.data.lastName ? infos.data.userName : ""}</p>
            </div>
            {emailVerified === false &&
                <div className="flex flex-row">
                <p className="text-white text-center bg-error rounded-lg p-2 w-36 mr-5">{t("emailNotVerified")}</p>
                    {!isSendMail &&
                        <Button id={"button-valid-mail"} type="button" onClick={valdMail} className="h-auto w-40 border-2 rounded-lg p-2 bg-green-800 text-white"> {t("validMail")} </Button>
                    }
                </div>
            }
            <ul className="flex flex-col mt-5 md:flex-row md:flex-wrap lg:flex-col">
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={map} alt="map" className="mr-1"/>
                    <p id="map" className="bg-primary text-white">{infos.data.localisation}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={company} alt="map" className="mr-1"/>
                    <p id="company" className="bg-primary text-white">{infos.data.company}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={school} alt="map" className="mr-1"/>
                    <p id="school" className="bg-primary text-white">{infos.data.school}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={github} alt="map" className="mr-1"/>
                    <p id="github" className="bg-primary text-white">{infos.data.github}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={link} alt="map" className="mr-1"/>
                    <p id="link" className="bg-primary text-white">{infos.data.url}</p>
                </li>
                <li className="flex flex-row mb-2">
                    <img src={titles} alt="map" className="mr-1"/>
                    <p id="titles" className="bg-primary text-white">
                        {title && title || "Aucun titre"}
                    </p>
                </li>
            </ul>
            <Button type="button" onClick={openPopup}
                    className="border-2 bg-tertiari rounded-lg text-secondary p-2 w-40"
                    id="save">{t("update")}</Button>
        </div>
    );
}

export default InfosUser;