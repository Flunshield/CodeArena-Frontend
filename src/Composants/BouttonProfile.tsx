import {useEffect, useState} from "react";
import Button from '../ComposantsCommun/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../Interface/Interface.ts";
import {ADMIN, COMPTE, DASHBOARD_ENTREPRISE, GROUPS, LOGOUT} from "../constantes.ts";
import noImage from '/assets/photosProfiles/noImage.png';
import {checkUrl} from "../Helpers/methodeHelper.ts";
import clsx from "clsx";

const BouttonProfile = () => {

    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [showPopup, setShowPopup] = useState(false);
    const [avatar, setAvatar] = useState<string>(noImage);
    const role = infos.data.groups.roles
    const [currentPage, setCurrentPage] = useState<string>();

    const handleClickSingOut = () => {
        navigate(LOGOUT);
    };

    useEffect(() => {
        if (infos.data.avatar !== "") {
            setAvatar(infos?.data?.avatar ?? noImage);
        }

        setCurrentPage(checkUrl())
    }, [infos?.data?.avatar]);

    return (
        <div className={clsx(currentPage === "myAccount" && infos.data.groups.roles === "User" ? "hidden" : "block")}>
            <div
                id="id-bouton-profile"
                className="relative cursor-pointer w-max p-10 pt-0"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
            >
                <img
                    src={avatar}
                    alt="profile"
                    className="w-20 h-20 rounded-full cursor-pointer m-5"
                />
                {showPopup && (
                    <div
                        className="fixed right-5 bg-secondary text-tertiari border-2 border-tertiari p-2 text-xl rounded shadow">
                        <div className='p-2'>
                            <div className='flex flex-col justify-center'>
                                <Button id='button-compte' type={'button'} className={clsx(currentPage === "myAccount" ? "hidden" : "block", "mb-5")}>
                                    <Link to={COMPTE}>Mon Compte</Link>
                                </Button>
                                {role === GROUPS.ADMIN &&
                                    <Button id='button-compte' type={'button'} className={clsx(currentPage === "admin" ? "hidden" : "block", "mb-5")}>
                                        <Link to={ADMIN}>Administration</Link>
                                    </Button>
                                }
                                {role === GROUPS.ENTREPRISE &&
                                    <Button id='button-compte' type={'button'} className={clsx(currentPage === "dashboardEntreprise" ? "hidden" : "block", "mb-5")}>
                                        <Link to={DASHBOARD_ENTREPRISE}>Dashboard Entreprise</Link>
                                    </Button>
                                }
                            </div>
                            <Button
                                type="button"
                                id="signOut"
                                className="border-1 text-tertiari text-1xl m-3 border-2 border-tertiari rounded-md p-2 mt-10"
                                onClick={handleClickSingOut}
                            >
                                {t('disonnect')}
                            </Button>
                        </div>
                        <div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BouttonProfile
