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
        <div className="m-5 flex flex-col">
            <div className="">
                <p className="text-tertiari mb-1 uppercase font-bold text-xl ml-2">{infos.data.firstName && infos.data.lastName ? infos.data.firstName + " " + infos.data.lastName : infos.data.userName}</p>
                <p className="text-gray-600 mb-5 uppercase font-bold text-xl">{infos.data.firstName && infos.data.lastName ? infos.data.userName : ""}</p>
            </div>
            {emailVerified === false &&
                <div className="flex flex-row">
                    <p className="text-tertiari text-center bg-error rounded-lg p-2 w-36 mr-5">{t("emailNotVerified")}</p>
                    {!isSendMail &&
                        <Button id={"button-valid-mail"} type="button" onClick={valdMail}
                                className="h-auto w-40 border-2 rounded-lg p-2 bg-green-800 text-tertiari"> {t("validMail")} </Button>
                    }
                </div>
            }
            <div className="flex flex-col md:flex-row md:justify-around text-tertiari m-5 p-5 border-2 rounded-lg">
            <ul>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={map} alt="map" className="mr-1"/>
                    <p id="map" className="bg-primary text-tertiary p-2 rounded-md">{infos.data.localisation}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={company} alt="company" className="mr-1"/>
                    <p id="company" className="bg-primary text-tertiary p-2 rounded-md">{infos.data.company}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={school} alt="school" className="mr-1"/>
                    <p id="school" className="bg-primary text-tertiary p-2 rounded-md">{infos.data.school}</p>
                </li>
            </ul>

            <ul>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={github} alt="github" className="mr-1"/>
                    <p id="github" className="bg-primary text-tertiary p-2 rounded-md">{infos.data.github}</p>
                </li>
                <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
                    <img src={link} alt="link" className="mr-1"/>
                    <p id="link" className="bg-primary text-tertiary p-2 rounded-md">{infos.data.url}</p>
                </li>
                <li className="flex flex-row mb-2">
                    <img src={titles} alt="titles" className="mr-1"/>
                    <p id="titles" className="bg-primary text-tertiary p-2 rounded-md">
                        {title ? title : "Aucun titre"}
                    </p>
                </li>
            </ul>
            </div>
            <Button type="button" onClick={openPopup}
                    className="border-2 bg-tertiary rounded-lg text-tertiari p-2 w-40" id="save">
                {t("update")}
            </Button>
        </div>
    );
}

export default InfosUser;