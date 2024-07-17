import {formatDate} from "../../../Helpers/formatHelper.ts";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import {User} from "../../../Interface/Interface.ts";

interface popupUsersProps {
    userInfos?: User;
    closePopup: () => void;
    getPdf: (idCv: number) => void;
}

const PopupUsers = ({userInfos, closePopup, getPdf}: popupUsersProps) => {
    const {t} = useTranslation();
    // Définir la source de l'image
    const imgSrc = userInfos?.avatar !== ""
        ? (userInfos?.avatar ? userInfos?.avatar : "/assets/photosProfiles/noImage.svg")
        : userInfos?.avatar;

    return (
        <div
            className="fixed top-0 left-0 w-full h-full overflow-auto flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div
                className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-auto rounded-lg shadow-lg p-6 max-md:p-1 m-5">
                <div className="flex justify-end">
                    <button
                        className="text-3xl text-gray-700 hover:text-gray-600"
                        onClick={closePopup}
                    >
                        &times;
                    </button>
                </div>
                <div className="flex flex-row justify-around space-y-4 max-md:flex-col">
                    <div>
                        <h2 className="text-2xl text-center font-semibold text-secondary mb-10">
                            {t('userInfos')}
                        </h2>
                        <div className="flex flex-col space-y-4">
                            <div>
                                        <span
                                            className="font-semibold">{t('firstName')}:</span> {userInfos?.firstName ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('lastName')}:</span> {userInfos?.lastName ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('email')}:</span> {userInfos?.email ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('userName')}:</span> {userInfos?.userName ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('languagePreference')}:</span> {userInfos?.languagePreference ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('gitHub')}:</span> {userInfos?.github ?
                                <a href={userInfos?.github}
                                   className={"underline text-petroleum-blue"}>{userInfos?.github}</a> : t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('school')}:</span> {userInfos?.school ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('localisation')}:</span> {userInfos?.localisation ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('company')}:</span> {userInfos?.company ?? t("noRenseignement")}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('lastLogin')}:</span> {formatDate(userInfos?.lastLogin, t)}
                            </div>
                            <div>
                                        <span
                                            className="font-semibold">{t('urlWebsite')}:</span> {userInfos?.url ?
                                <a href={userInfos?.url}
                                   className={"underline text-petroleum-blue"}>{userInfos?.url}</a> : t("noRenseignement")}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-10">
                        <img
                            className={clsx(
                                imgSrc === "/assets/photosProfiles/noImage.svg" ? "pb-10 pl-10" : "",
                                "rounded-full w-48 h-48 border-2 border-tertiari max-md:hidden bg-gris-chaud"
                            )}
                            src={imgSrc}
                            alt="Avatar"
                        />
                        {userInfos && userInfos?.idCvUser !== null &&
                            <button
                                className={clsx(userInfos?.idCvUser ? "" : "hidden", "rounded-xl pr-5 pl-5 p-1 bg-olive-green text-tertiari")}
                                onClick={() => getPdf(userInfos?.idCvUser ?? -1)}>{t('getCv')}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupUsers;