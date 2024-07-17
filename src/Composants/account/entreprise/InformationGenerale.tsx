import clsx from "clsx";
import {useState} from "react";
import {algoLuhn, isValidAddress} from "../../../Helpers/methodeHelper.ts";
import {getElementByEndpoint, postElementByEndpoint, updateUser} from "../../../Helpers/apiHelper.ts";
import {useTranslation} from "react-i18next";
import {User} from "../../../Interface/Interface.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import Notification from "../../../ComposantsCommun/Notification.tsx";
import Button from "../../../ComposantsCommun/Button.tsx";
import {useNavigate} from "react-router-dom";
import {LOGOUT} from "../../../constantes/constantesRoutes.ts";

interface informationGeneraleProps {
    infosUserById: User
    setIsSubmitted: (p: (count: number) => number) => void;
    className?: string;
}

const informationGenerale = ({infosUserById, setIsSubmitted, className}: informationGeneraleProps) => {

    const {t} = useTranslation();
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();

    const [errorSiren, setErrorSiren] = useState(false);
    const [errorLocalisation, setErrorLocalisation] = useState(false);
    const [formData, setFormData] = useState({
        localisation: infosUserById?.localisation ?? '',
        company: infosUserById?.company ?? '',
        siren: infosUserById?.siren ?? '',
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handleClick() {
        postElementByEndpoint('entreprise/unsuscribe', {
            data: {userId: infosUserById.id},
            token: authContext.accessToken ?? ""
        }).then(async (repsonse) => {
            if (repsonse.status === 201) {
                setPopupOpen(false);
                setNotificationMessage(t('unsubscribeSuccess'));
                setNotificationType('info');
                setShowNotification(true);
                setTimeout(() => {
                    navigate(LOGOUT)
                }, 3000);
            }
            if (repsonse.status === 404) {
                setNotificationMessage(t('unsubscribeFail'));
                setNotificationType('error');
                setShowNotification(true);
            }
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!isValidAddress(formData.localisation)) {
            setNotificationMessage(t('errorFormatAdresse'));
            setNotificationType('error');
            setShowNotification(true);
            setErrorLocalisation(true);
        }
        if (!algoLuhn(formData.siren)) {
            setNotificationMessage(t('errorSiren'));
            setNotificationType('error');
            setShowNotification(true);
            setErrorSiren(true);

        }
        if (isValidAddress(formData.localisation) && algoLuhn(formData.siren)) {
            setErrorSiren(false);
            setErrorLocalisation(false);

            const response = await updateUser("user/updateUser", {
                id: infosUserById?.id,
                token: authContext.accessToken,
                userName: infosUserById?.userName,
                localisation: formData.localisation,
                company: formData.company,
                school: infosUserById?.school,
                github: infosUserById?.github,
                url: infosUserById?.url,
                lastName: infosUserById?.lastName,
                firstName: infosUserById?.firstName,
                titlesId: infosUserById?.titlesId,
                siren: formData.siren,
            });

            if (response.ok) {
                setNotificationMessage(t('succesMajEntreprise'));
                setNotificationType('success');
                setShowNotification(true);
                setIsSubmitted((count: number) => count + 1)
            } else {
                setNotificationMessage(t('errorMajEntreprise'));
                setNotificationType('error');
                setShowNotification(true);
            }
        }
    };
    
    const getLatestInvoice = async () => {

        try {
            const response = await getElementByEndpoint('stripe/lastCommande?id=' + infosUserById.id, {
                data: "",
                token: authContext.accessToken ?? ""
            })

            if (!response.ok) {
                console.error(t('errorInvoice'));
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '-').replace(',', '').replace(/:/g, '');
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formattedDate}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(t('errorInvoice'), error);
        }
    };

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        setPopupOpen(false);
    };

    return (
        <div id="informationGenerale" className={className}>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                    delay={2000}
                />
            )}
            <h2 className="text-2xl text-center text-tertiari font-bold">{t('generalinformation')}</h2>
            <div className="flex max-lg:flex-col bg-tertiari m-5 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex-1 m-5 p-6">
                    <h2 className="text-2xl text-center -mb-5 text-secondary font-bold">{t('modify')}</h2>
                    <div className="space-y-4 w-full text-center mt-10 mb-10">
                        <div className="flex flex-col mt-14">
                            <label htmlFor="company" className="block text-gray-700 font-semibold">
                                {t('entreprise')}
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="mt-1 w-auto rounded-md shadow-sm text-center"
                            />
                        </div>
                        <div className="flex flex-col mt-10">
                            <label htmlFor="siren" className="block text-gray-700 font-semibold">
                                {t('siren')}
                            </label>
                            <input
                                type="text"
                                id="siren"
                                name="siren"
                                value={formData.siren}
                                onChange={handleChange}
                                className={clsx(errorSiren ? "border-2 border-error" : "", "mt-1 w-auto rounded-md shadow-sm text-center")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="localisation" className="block text-gray-700 font-semibold">
                                {t('adresse')}
                            </label>
                            <input
                                type="text"
                                id="localisation"
                                name="localisation"
                                value={formData.localisation}
                                onChange={handleChange}
                                placeholder={"3000 Chemin de causan, 84350 Courthézon"}
                                className={clsx(errorLocalisation ? "border-2 border-error" : "", "mt-1 w-auto rounded-md shadow-sm text-center")}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full relative bottom-0">
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-petroleum-blue text-white hover:bg-petroleum-blue-dark transition duration-300 shadow-md"
                        >
                            {t('send')}
                        </button>
                    </div>
                </form>
                {infosUserById &&
                    <div className="space-y-4 flex-1 m-5">
                        <h2 className="text-2xl text-center -mb-5 text-secondary font-bold">{t('recapitulatif')}</h2>
                        <div>
                            <label htmlFor="company" className="block text-gray-700 font-semibold">
                                {t('entreprise')}
                            </label>
                            <p
                                className="block text-gray-700"
                            >{infosUserById?.company !== "" ? infosUserById?.company : t('noDonneesEnregistrer')}</p>
                        </div>
                        <div>
                            <label htmlFor="siren" className="block text-gray-700 font-semibold">
                                {t('siren')}
                            </label>
                            <p className="block text-gray-700">
                                {infosUserById?.siren !== "" ? infosUserById?.siren : t('noDonneesEnregistrer')}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="localisation" className="block text-gray-700 font-semibold">
                                {t('adresse')}
                            </label>
                            <p className="block text-gray-700">{infosUserById?.localisation !== "" ? infosUserById?.localisation : t('noDonneesEnregistrer')}</p>
                        </div>
                        <div>
                            <label htmlFor="abonnement" className="block text-gray-700 font-semibold">
                                {t('abonnement')}
                            </label>
                            <div className="mt-2 flex max-xs:flex-col">
                                <p className="block text-tertiari bg-olive-green w-32 text-center rounded-lg">{infosUserById.commandeEntrepriseFormatted?.pricing.title}</p>
                                <button type={"button"} className="ml-5 underline text-petroleum-blue hover:text-error"
                                        id={"unscribed"}
                                        onClick={openPopup}> {t("unscribed")} </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="abonnement" className="block text-gray-700 font-semibold">
                                {t('avantageAbonnement')}
                            </label>
                            <div className="mt-2 flex">
                                <p>{t('nbTestToCreate')}</p>
                                <p className="block text-tertiari max-sm:bg-tertiari max-sm:text-secondary bg-olive-green w-20 text-center rounded-lg ml-5">{infosUserById.commandeEntrepriseFormatted?.pricing.nbCreateTest}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="abonnement" className="block text-gray-700 font-semibold">
                                {t('prixAbonnement')}
                            </label>
                            <div className="mt-2 flex">
                                <p className="block text-tertiari max-sm:bg-tertiari max-sm:text-secondary bg-petroleum-blue w-20 text-center rounded-lg">{infosUserById.commandeEntrepriseFormatted?.pricing.price}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button id="button-recup-invoice" type="button" onClick={getLatestInvoice}
                                    className="bg-petroleum-blue text-tertiari p-1 rounded-lg">{t("recupInvoice")}</Button>
                        </div>
                    </div>}
            </div>
            {isPopupOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-tertiari p-8 rounded-md flex flex-col">
                        <h2 className="text-xl">{t('seriousUnsubscribe')}</h2>
                        <div className="flex justify-around mt-5">
                            <Button id="button-unscribed" type="button" onClick={handleClick}
                                    className="bg-gris-chaud text-white p-2 rounded-lg">{t('yes')}</Button>
                            <Button id="button-unscribed" type="button" onClick={closePopup}
                                    className="bg-olive-green text-white p-2 rounded-lg">{t('no')}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>)
}

export default informationGenerale;