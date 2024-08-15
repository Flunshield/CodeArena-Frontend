import React, {useEffect, useState} from "react";
import Layout from "../../ComposantsCommun/Layout.tsx";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import Notification from "../../ComposantsCommun/Notification.tsx";
import {ADMIN_EVENT_CREATE_DATABASE} from "../../constantes/constantesRoutes.ts";
import {downloadPdf} from "../../Helpers/methodeHelper.ts";

function adminEventCreate() {
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        playerMax: 50,
        title: "",
        description: "",
        rewards: "",
        organize: "",
        createPuzzles: false,
        priceAdjustment: 0,
        priceDetails: {
            basePrice: 1000,
            proximityCharge: 0,
            durationCharge: 0,
            extraPlayersCharge: 0,
            puzzlesCharge: 0,
            adjustmentCharge: 0,
            finalPrice: 1000
        },
    });

    const [priceDetails, setPriceDetails] = useState({
        basePrice: 1000,
        proximityCharge: 0,
        durationCharge: 0,
        extraPlayersCharge: 0,
        puzzlesCharge: 0,
        adjustmentCharge: 0,
        finalPrice: 1000,
    });

    const calculatePrice = () => {
        const basePrice = 1000;
        let proximityCharge = 0;
        let durationCharge = 0;
        let extraPlayersCharge = 0;
        let puzzlesCharge = 0;
        let adjustmentCharge = 0;

        const today = new Date();
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        // Conversion des dates en millisecondes
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        const todayTime = today.getTime();

        // Calcul de la durée de l'événement en jours
        const eventDuration = (endTime - startTime) / (1000 * 60 * 60 * 24); // Durée en jours

        // Ajouter 100€ si l'événement est dans moins d'une semaine
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        if (startTime - todayTime < oneWeekInMillis && startTime - todayTime >= 0) {
            proximityCharge = 100;
        }

        // Ajouter 50€ par jour d'événement
        durationCharge = 50 * eventDuration;

        // Ajouter 1€ par joueur supplémentaire (au-dessus de 50)
        if (formData.playerMax > 50) {
            extraPlayersCharge = formData.playerMax - 50;
        }

        // Ajouter 500€ si la création des puzzles est requise
        if (formData.createPuzzles) {
            puzzlesCharge = 500;
        }

        // Appliquer l'ajustement de prix
        const subtotal = basePrice + proximityCharge + durationCharge + extraPlayersCharge + puzzlesCharge;
        adjustmentCharge = (subtotal * formData.priceAdjustment) / 100;

        const finalPrice = subtotal + adjustmentCharge;

        setPriceDetails({
            basePrice,
            proximityCharge,
            durationCharge,
            extraPlayersCharge,
            puzzlesCharge,
            adjustmentCharge,
            finalPrice,
        });
    };

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            calculatePrice();
        }
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        // Type guard pour vérifier si c'est un élément HTMLInputElement avec type checkbox
        if (type === "checkbox") {
            const target = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "select-one" ? Number(value) : value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formData.priceDetails = priceDetails;
        const newEvent = postElementByEndpoint(ADMIN_EVENT_CREATE_DATABASE, {
            token: authContext.accessToken ?? "",
            data: formData
        });
        newEvent.then(async (response) => {
            if (response.status === 201) {
                console.log(response);
                setNotificationMessage(t('createEventSuccess'));
                setNotificationType('success');
                setShowNotification(true);
                const pdfDownloadPromise = downloadPdf(response, "devis.pdf");
                console.log(pdfDownloadPromise);
                if (!pdfDownloadPromise) {
                    setNotificationMessage(t('errordownloadPdf'));
                    setNotificationType('error');
                    setShowNotification(true);
                }
            } else {
                setNotificationMessage(t('createEventError'));
                setNotificationType('error');
                setShowNotification(true);
            }
        });
    }

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <h1 className="text-3xl text-center font-bold text-gray-600 m-5">{t("createNewevent")}</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-secondary p-6 rounded-lg shadow-angelic-white m-5 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("dateDebut")} :</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("dateFin")} :</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("maxPlayer")} :</label>
                        <input
                            type="number"
                            name="playerMax"
                            value={formData.playerMax}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("title")} :</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-tertiari font-semibold mb-2">{t("description")} :</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("recompense")} :</label>
                        <input
                            type="text"
                            name="rewards"
                            value={formData.rewards}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-tertiari font-semibold mb-2">{t("organisateur")} :</label>
                        <input
                            type="text"
                            name="organize"
                            value={formData.organize}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="createPuzzles"
                                checked={formData.createPuzzles}
                                onChange={handleChange}
                                className="mr-2 h-4 w-4 text-light-blue focus:ring-light-blue border-soft-gray rounded"
                            />
                            <label className="text-tertiari font-semibold">{t("createPuzzle")} (+500€)</label>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-tertiari font-semibold mb-2">{t("ajustPrice")} (%) :</label>
                        <select
                            name="priceAdjustment"
                            value={formData.priceAdjustment}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-quaternary text-tertiari border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        >
                            <option value="-20">-20%</option>
                            <option value="-10">-10%</option>
                            <option value="0">0%</option>
                            <option value="10">+10%</option>
                            <option value="20">+20%</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-tertiari font-semibold text-lg">
                        Prix estimé : <span className="text-light-blue">{priceDetails.finalPrice.toFixed(2)}€</span>
                    </p>
                </div>
                <div className="bg-quaternary p-4 rounded-lg mt-6">
                    <h2 className="text-xl font-bold text-tertiari mb-4">{t("detailPrice")} :</h2>
                    <ul className="text-tertiari">
                        <li>{t("basePrice")} : {priceDetails.basePrice}€</li>
                        <li>{t("majorationDateProche")} : {priceDetails.proximityCharge.toFixed(2)}€</li>
                        <li>{t("majorationDuree")} ({(priceDetails.durationCharge / 50).toFixed(2)} jours)
                            : {priceDetails.durationCharge.toFixed(2)}€
                        </li>
                        <li>{t("addPlayers")} : {priceDetails.extraPlayersCharge.toFixed(2)}€</li>
                        <li>{t("creationPuzzles")} : {priceDetails.puzzlesCharge.toFixed(2)}€</li>
                        <li>{t("ajustementPrice")} ({formData.priceAdjustment.toFixed(2)}%)
                            : {priceDetails.adjustmentCharge.toFixed(2)}€
                        </li>
                        <li>{t("totalPrice")} : {priceDetails.finalPrice.toFixed(2)}€</li>
                    </ul>
                </div>
                <button
                    type="submit"
                    className="w-full bg-light-blue text-quaternary font-bold py-2 rounded shadow-glow hover:bg-petroleum-blue transition duration-300 mt-6"
                >
                    {t("createEvent")}
                </button>
            </form>
        </Layout>
    );
}

export default adminEventCreate;
