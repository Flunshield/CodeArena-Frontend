import {useEffect, useRef, useState} from "react";
import Button from '../ComposantsCommun/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {JwtPayload} from "jwt-decode";
import {DataToken, User} from "../Interface/Interface.ts";
import {ADMIN, COMPTE, DASHBOARD_ENTREPRISE, GROUPS, LOGOUT} from "../constantes/constantesRoutes.ts";
import loginIcons from "/assets/icons/iconsLogin.svg";
import {checkUrl} from "../Helpers/methodeHelper.ts";
import clsx from "clsx";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {PRICING} from "../constantes/constanteEntreprise.ts";

const BouttonProfile = () => {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [showPopup, setShowPopup] = useState(false);
    const [avatar, setAvatar] = useState<string>(loginIcons);
    const role = infos.data.groups.roles;
    const [currentPage, setCurrentPage] = useState<string>();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [infosUserById, setInfosUserById] = useState<User>({} as User);
    const getUserById = getElementByEndpoint("user/getUser?id=" + infos.data.id, {
        token: authContext.accessToken ?? "",
        data: "",
    })
    const handleClickSingOut = () => {
        navigate(LOGOUT);
    };

    const handlerPopUp = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        getUserById.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                result.commandeEntrepriseFormatted = {
                    commande: result?.commandeEntreprise[0],
                    pricing: PRICING.find((pricing) => pricing.idApi === result?.commandeEntreprise[0].item)
                };
                setInfosUserById(result);
                setAvatar(infosUserById?.avatar ?? loginIcons);
            }
        });
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
        <div className={clsx(currentPage === "myAccount" && infos.data.groups.roles === "User" ? "hidden" : "block")}>
            <div
                id="id-bouton-profile"
                className="relative cursor-pointer w-max pr-5 xs:p-10 xs:pt-0"
            >
                <img
                    src={avatar}
                    alt="profile"
                    className="h-16 transform hover:scale-110 transition-transform duration-300"
                    onClick={handlerPopUp}
                />
                {showPopup && (
                    <div
                        ref={popupRef}
                        className="fixed right-5 bg-secondary text-tertiari border-2 border-tertiari p-2 text-xl rounded shadow"
                    >
                        <div className='p-2'>
                            <div className='flex flex-col items-center'>
                                <Button id='button-compte' type={'button'}
                                        className={clsx(currentPage === "myAccount" ? "hidden" : "block", "mb-5 hover:underline")}>
                                    <Link to={COMPTE}>{t('monCompte')}</Link>
                                </Button>
                                {role === GROUPS.ADMIN &&
                                    <Button id='button-compte-admin' type={'button'}
                                            className={clsx(currentPage === "admin" ? "hidden" : "block", "mb-5 hover:underline")}>
                                        <Link to={ADMIN}>{t('administration')}</Link>
                                    </Button>
                                }
                                {role === GROUPS.ENTREPRISE &&
                                    <Button id='button-compte-entreprise' type={'button'}
                                            className={clsx(currentPage === "dashboardEntreprise" ? "hidden" : "block", "mb-5 hover:underline")}>
                                        <Link to={DASHBOARD_ENTREPRISE}>{t('dashboardEntreprise')}</Link>
                                    </Button>
                                }
                            </div>
                            <Button
                                type="button"
                                id="signOut"
                                className="border-1 text-tertiari text-1xl m-3 border-2 border-tertiari rounded-md p-2 mt-10 hover:underline"
                                onClick={handleClickSingOut}
                            >
                                {t('disonnect')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BouttonProfile;