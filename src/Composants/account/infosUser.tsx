import React, { useState } from "react";
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
import {DataToken, User} from "../../Interface/Interface.ts";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import ListItem from "../../ComposantsCommun/ListItem.tsx";
import ProfilePicture from "./profilePicture.tsx";
import Badges from "./bagdes.tsx";
import { GROUPS } from "../../constantes/constantes";
import Administration from "./entreprise/Administration";
import { Container } from "../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn";
import clsx from "clsx";


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
    infosUserById
}) => {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const isEntreprise = infos.data.groups.roles === GROUPS.ENTREPRISE
    const emailVerified = infosUserById?.emailVerified
    const title = infosUserById?.titles?.label as unknown as string
    const [isSendMail, setIsSendMail] = React.useState<boolean>(false);
    const [, setShowNotification] = useState(false);
    const [, setNotificationType] = useState('');
    const [, setNotificationMessage] = useState('');

    const valdMail = async () => {
        const response = await postElementByEndpoint('user/validMail', {
            token: authContext.accessToken ?? "",
            data: infosUserById
        });

        if (response.status === 201) {
            setIsSendMail(true);
            setNotificationMessage(t('mailToSend'));
            setNotificationType('success');
            setShowNotification(true);
        } else {
            setNotificationMessage(t('errormailToSend'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <Container className=" py-16">
            <FadeInStagger>
                <FadeIn>
                    <div className="flex flex-col items-center text-neutral-900 w-full">
                        <div className="mb-10 text-center">
                            <ProfilePicture classname="max-sm:hidden ml-16" infosUserById={infosUserById}/>
                            <div className="mt-10">
                                <p className="text-neutral-900 mb-1 uppercase font-bold max-sm:text-xl text-2xl">
                                    {infosUserById?.firstName && infosUserById?.lastName ? `${infosUserById?.firstName} ${infosUserById?.lastName}` : infosUserById?.userName}
                                </p>
                                <p className="text-neutral-900 mb-5 uppercase font-semibold text-lg">
                                    {infosUserById?.firstName && infosUserById?.lastName ? infosUserById?.userName : ""}
                                </p>
                                <div>
                                    {!emailVerified && (
                                        <div className="flex flex-col md:flex-row justify-center items-center mt-6">
                                            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                                                <p className="bg-red-500 text-white rounded-lg p-2 text-center">{t("emailNotVerified")}</p>
                                                {!isSendMail && (
                                                    <Button
                                                        id="button-valid-mail"
                                                        type="button"
                                                        onClick={valdMail}
                                                        className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                                    >
                                                        {t("validMail")}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={clsx(isEntreprise ? "flex-col-reverse" : "max-2xl:flex-col", "flex flex-row w-full justify-center")}>
                            {!isEntreprise && (
                                <FadeIn className="flex flex-col text-secondary bg-secondary m-5 border rounded-lg shadow-lg  p-6">
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <ul className="space-y-4 w-full">
                                            <ListItem icon={map} id="map" text={infosUserById?.localisation ?? ""} />
                                            <ListItem icon={company} id="company" text={infosUserById?.company ?? ""} />
                                            <ListItem icon={school} id="school" text={infosUserById?.school ?? ""} />
                                        </ul>
                                        <ul className="space-y-4">
                                            <ListItem icon={github} id="github" text={infosUserById?.github ?? ""} />
                                            <ListItem icon={link} id="link" text={infosUserById?.url ?? ""} />
                                            <ListItem icon={titles} id="titles" text={title ? title : "Aucun titre"} />
                                        </ul>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={openPopup}
                                        className="bg-tertiari hover:bg-primary-light  text-secondary font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4 self-center"
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
                                <FadeIn>
                                    <Badges infosUserById={infosUserById} />
                                </FadeIn>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </FadeInStagger>
        </Container>
    );
};

export default InfosUser;
