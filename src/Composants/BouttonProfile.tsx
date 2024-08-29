import {useEffect, useRef, useState} from "react";
import Button from '../ComposantsCommun/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../Interface/Interface.ts";
import {
    ADMIN,
    ADMIN_EVENT_CREATE,
    ADMIN_EVENT_DASHBOARD,
    COMPTE,
    DASHBOARD_ENTREPRISE,
    GROUPS,
    LOGOUT
} from "../constantes/constantesRoutes.ts";
import loginIcons from "/assets/photosProfiles/noImage.svg";
import {checkUrl} from "../Helpers/methodeHelper.ts";
import clsx from "clsx";
import useUserInfos from "../hook/useUserInfos.ts";

const BouttonProfile = () => {
    const authContext = useAuthContext();
    const infosUserById = useUserInfos();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [showPopup, setShowPopup] = useState(false);
    const [avatar, setAvatar] = useState<string>(loginIcons);
    const role = infos.data.groups.roles;
    const isEntreprise = role === GROUPS.ENTREPRISE;
    const isAdmin = role === GROUPS.ADMIN;
    const [currentPage, setCurrentPage] = useState<string>();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const handleClickSingOut = () => {
        navigate(LOGOUT);
    };

    const handlerPopUp = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        setAvatar(infosUserById?.avatar ?? loginIcons);
        setCurrentPage(checkUrl());
    }, [infosUserById?.avatar]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        const handleScroll = () => {
            setShowPopup(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={clsx(currentPage === "myAccount" && infos.data.groups.roles === "User" ? "block" : "block")}>
            <div
                id="id-bouton-profile"
                className="relative cursor-pointer w-max pr-5 xs:p-10 xs:pt-0"
            >
                <img
                    src={avatar}
                    alt="profile"
                    className=" rounded-3xl h-14  transform hover:scale-110 transition-transform duration-300 "
                    onClick={handlerPopUp}
                />
                {showPopup && (
                    <div
                        ref={popupRef}
                        className="fixed right-5 bg-secondary text-tertiari border-2 border-tertiari p-2 text-xl rounded shadow"
                    >
                        <div className='p-2'>
                            <div className='flex flex-col items-center space-y-5'>
                                <Button id='button-compte' type={'button'}
                                        className={clsx(currentPage === "myAccount" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                    <Link to={COMPTE}>{t('monCompte')}</Link>
                                </Button>
                                {isAdmin &&
                                    <div className="flex flex-col items-center space-y-5">
                                        <Button id='button-compte-admin' type={'button'}
                                                className={clsx(currentPage === "admin" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                            <Link to={ADMIN}>{t('administration')}</Link>
                                        </Button>
                                        <Button id='button-compte-admin' type={'button'}
                                                className={clsx(currentPage === "adminEvent" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                            <Link to={ADMIN_EVENT_CREATE}>{t('createEvent')}</Link>
                                        </Button>
                                        <Button id='button-compte-admin' type={'button'}
                                                className={clsx(currentPage === "adminEventDashboard" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                            <Link to={ADMIN_EVENT_DASHBOARD}>{t('dashboardEvent')}</Link>
                                        </Button>
                                    </div>
                                }
                                {isEntreprise &&
                                    <div className="flex flex-col items-center space-y-5">
                                        <Button id='button-compte-entreprise' type={'button'}
                                                className={clsx(currentPage === "dashboardEntreprise" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                            <Link to={DASHBOARD_ENTREPRISE}>{t('dashboardEntreprise')}</Link>
                                        </Button>
                                        <Button id='button-compte-admin' type={'button'}
                                                className={clsx(currentPage === "adminEventDashboard" ? "bg-tertiari text-gray-600 rounded-xl p-2" : "", "hover:underline")}>
                                            <Link to={ADMIN_EVENT_DASHBOARD}>{t('dashboardEvent')}</Link>
                                        </Button>
                                    </div>
                                }
                            </div>
                            <div className="w-full flex justify-center">
                            <Button
                                type="button"
                                id="signOut"
                                className="border-1 text-tertiari text-1xl border-2 border-tertiari rounded-md p-2 mt-10 hover:underline"
                                onClick={handleClickSingOut}
                            >
                                {t('disconnect')}
                            </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BouttonProfile;