import React, { useState } from "react";
import map from "/assets/icones/map-marker.png";
import company from "/assets/icones/company.png";
import school from "/assets/icones/school.png";
import github from "/assets/icones/github.png";
import link from "/assets/icones/link.png";
import code from "/assets/icones/code.svg";
import titles from "/assets/icones/flag.png";
import Button from "../../ComposantsCommun/Button.tsx";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken, Match, User } from "../../Interface/Interface.ts";
import { getElementByEndpoint, postElementByEndpoint } from "../../Helpers/apiHelper.ts";
import ListItem from "../../ComposantsCommun/ListItem.tsx";
import ProfilePicture from "./profilePicture.tsx";
import Badges from "./bagdes.tsx";
import { GROUPS } from "../../constantes/constantes";
import Administration from "./entreprise/Administration";
import { Container } from "../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn";
import clsx from "clsx";
import Notification from "../../ComposantsCommun/Notification.tsx";
import MatchHistory from "./MatchHistory.tsx";
import Presentation from "./presentation.tsx";

interface InfosUserProps {
    openPopup: () => void;
    setIsInformationGeneraleCliked: (value: boolean) => void;
    setIsHistoriqueOrderClicked: (value: boolean) => void;
    setIsSubmitted: () => void;
    infosUserById: User;
}

const InfosUser: React.FC<InfosUserProps> = ({
    openPopup,
    setIsInformationGeneraleCliked,
    setIsHistoriqueOrderClicked,
    setIsSubmitted,
    infosUserById,
}) => {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    // Récupération des informations utilisateur
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const isEntreprise = infos.data.groups.roles === GROUPS.ENTREPRISE;
    const isUser = infos.data.groups.roles === GROUPS.USER;
    const emailVerified = infosUserById?.emailVerified;
    const title = infosUserById?.titles?.label as unknown as string;
    const [isSendMail, setIsSendMail] = React.useState<boolean>(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [historiqueMatch, setHistoriqueMatch] = useState<Match[]>([]);

    const valdMail = async () => {
        const response = await postElementByEndpoint("user/validMail", {
            token: authContext.accessToken ?? "",
            data: infosUserById,
        });

        if (response.status === 201) {
            setIsSendMail(true);
            setNotificationMessage(t("mailToSend"));
            setNotificationType("success");
            setShowNotification(true);
        } else {
            setNotificationMessage(t("errormailToSend"));
            setNotificationType("error");
            setShowNotification(true);
        }
    };

    function closePopup() {
        setPopupOpen(false);
    }

    function getHistoriqueMatch() {
        getElementByEndpoint("user/getHistoriqueMatch?id=" + infosUserById.id, {
            token: authContext.accessToken ?? "",
            data: "",
        }).then(async (response) => {
            if (response.status === 200) {
                setHistoriqueMatch(await response.json());
                setPopupOpen(true);
            } else {
                console.log("Erreur lors de la récupération de l'historique des matchs");
            }
        });
    }

    return (
        <Container className="py-16 px-4">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <FadeInStagger>
                <FadeIn>
                    <div className="flex flex-col items-center text-neutral-900 w-full">
                        <div className="mb-10 text-center">
                            <ProfilePicture
                                classname="hidden sm:block sm:ml-16"
                                infosUserById={infosUserById}
                            />
                            <div className="mt-10">
                                <p className="text-neutral-900 mb-1 uppercase font-bold sm:text-xl text-2xl">
                                    {infosUserById?.firstName && infosUserById?.lastName
                                        ? `${infosUserById?.firstName} ${infosUserById?.lastName}`
                                        : infosUserById?.userName}
                                </p>
                                {isUser && <p className="text-petroleum-blue underline cursor-pointer"
                                    onClick={() => getHistoriqueMatch()}>{t('historyMatch')}</p>}
                                <p className="text-neutral-900 mb-5 uppercase font-semibold text-lg">
                                    {infosUserById?.firstName && infosUserById?.lastName
                                        ? infosUserById?.userName
                                        : ""}
                                </p>
                                <div>
                                    {!emailVerified && (
                                        <div
                                            className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-3 md:space-y-0 md:space-x-3">
                                            <p className="bg-red-500 text-tertiari rounded-lg p-2 text-center">
                                                {t("emailNotVerified")}
                                            </p>
                                            {!isSendMail && (
                                                <Button
                                                    id="button-valid-mail"
                                                    type="button"
                                                    onClick={valdMail}
                                                    className="bg-green-800 hover:bg-green-700 text-tertiari font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                                >
                                                    {t("validMail")}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                isEntreprise ? "flex-col-reverse" : "flex-col",
                                "flex flex-row w-full justify-center"
                            )}
                        >
                            {!isEntreprise && (
                                <FadeIn
                                    className="flex flex-col text-secondary bg-secondary m-0 border rounded-lg shadow-lg p-6 w-full sm:w-auto">
                                    <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
                                        <ul className="space-y-4 w-full md:w-1/2">
                                            <ListItem
                                                icon={map}
                                                id="map"
                                                text={infosUserById?.localisation ?? ""}
                                            />
                                            <ListItem
                                                icon={company}
                                                id="company"
                                                text={infosUserById?.company ?? ""}
                                            />
                                            <ListItem
                                                icon={school}
                                                id="school"
                                                text={infosUserById?.school ?? ""}
                                            />
                                        </ul>
                                        <ul className="space-y-4 w-full md:w-1/2">
                                            <ListItem
                                                icon={github}
                                                id="github"
                                                text={infosUserById?.github ?? ""}
                                            />
                                            <ListItem
                                                icon={link}
                                                id="link"
                                                text={infosUserById?.url ?? ""}
                                            />
                                            <ListItem
                                                icon={titles}
                                                id="titles"
                                                text={title ? title : "Aucun titre"}
                                            />
                                            <ListItem
                                                icon={code}
                                                id="languagePreference"
                                                text={infosUserById.languagePreference ?? ""}
                                               
                                            />
                                        </ul>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={openPopup}
                                        className="bg-tertiari hover:bg-primary-light text-secondary font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4 self-center md:self-end"
                                        id="save"
                                    >
                                        {t("update")}
                                    </Button>
                                </FadeIn>
                            )}
                            {isEntreprise ? (
                                <FadeIn>
                                    <Administration
                                        setIsInformationGeneraleCliked={setIsInformationGeneraleCliked}
                                        setIsHistoriqueOrderClicked={setIsHistoriqueOrderClicked}
                                        setIsSubmitted={() => setIsSubmitted()}
                                    />
                                </FadeIn>
                            ) : (
                                <div className="flex align-baseline justify-between w-full space-x-5 mt-5">
                                    <FadeIn>
                                        <Badges infosUserById={infosUserById} />
                                    </FadeIn>
                                    <FadeIn>
                                        <Presentation infosUserById={infosUserById} />
                                    </FadeIn>
                                </div>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </FadeInStagger>
            {isPopupOpen && isUser && (
                <div
                    className="fixed top-0 left-0 z-50 p-4 lg:p-8 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-gray-100 p-8 rounded-md shadow-lg max-h-full w-auto overflow-y-auto">
                        {isUser && <MatchHistory historiqueMatch={historiqueMatch} />}
                        <button
                            onClick={closePopup}
                            className="absolute top-2 right-2 rounded-full bg-error hover:bg-tertiary-light text-tertiari font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

        </Container>
    );
};

export default InfosUser;