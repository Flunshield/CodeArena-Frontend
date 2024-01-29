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

interface InfosUserProps {
    openPopup: () => void;
}

const InfosUser: React.FC<InfosUserProps> = ({openPopup}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();

    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const title = infos?.data?.titles?.label as unknown as string

    return (
        <div className="ml-28 mb-10 flex flex-col">
            <div className="md:ml-52 lg:ml-0">
                <p className="text-white mb-1 uppercase font-bold text-xl ml-2">{infos.data.firstName && infos.data.lastName ? infos.data.firstName + " " + infos.data.lastName : infos.data.userName}</p>
                <p className="text-gray-600 mb-5 uppercase font-bold text-xl">{infos.data.firstName && infos.data.lastName ? infos.data.userName : ""}</p>
            </div>
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