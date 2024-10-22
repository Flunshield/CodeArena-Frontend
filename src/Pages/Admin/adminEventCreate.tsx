import React, {useEffect, useState} from "react";
import Layout from "../../ComposantsCommun/Layout.tsx";
import {getElementByEndpoint, postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import Notification from "../../ComposantsCommun/Notification.tsx";
import {ADMIN_EVENT_CREATE_DATABASE} from "../../constantes/constantesRoutes.ts";
import {downloadPdf} from "../../Helpers/methodeHelper.ts";
import {User} from "../../Interface/Interface.ts";

function adminEventCreate() {
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const {t} = useTranslation();
    const [filteredSuggestions, setFilteredSuggestions] = useState<User[]>([]);
    const [userName, setUserName] = useState<string | undefined>("");
    const getAllUserEntreprise = async () => {
        const response = await getElementByEndpoint("entreprise/getUserEntreprise?userName=" + userName, {
            token: authContext.accessToken ?? "",
            data: ""
        })
        return await response.json();

    }

    function handleChangeUserName(event: string) {
        setUserName(event);
        if (event.length > 4) {
            getAllUserEntreprise().then((response) => {
                setFilteredSuggestions(response);
            });
        }
    }

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
        userName: "",
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
        formData.userName = userName ?? "";
        const newEvent = postElementByEndpoint(ADMIN_EVENT_CREATE_DATABASE, {
            token: authContext.accessToken ?? "",
            data: formData
        });
        newEvent.then(async (response) => {
            if (response.status === 201) {
                setNotificationMessage(t('createEventSuccess'));
                setNotificationType('success');
                setShowNotification(true);
                const pdfDownloadPromise = downloadPdf(response, "devis.pdf");
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
                className="bg-tertiari p-6 rounded-lg shadow-angelic-white m-5 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("dateDebut")} :</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("dateFin")} :</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("maxPlayer")} :</label>
                        <input
                            type="number"
                            name="playerMax"
                            value={formData.playerMax}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("title")} :</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-secondary font-semibold mb-2">{t("description")} :</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("recompense")} :</label>
                        <input
                            type="text"
                            name="rewards"
                            value={formData.rewards}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary font-semibold mb-2">{t("organisateur")} :</label>
                        <div>
                            <input
                                type="text"
                                name="organize"
                                value={userName}
                                onChange={(event) => handleChangeUserName(event.target.value)}
                                required
                                className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
                            />

                            {/* Affichage des suggestions filtrées */}
                            {filteredSuggestions.length > 0 && userName && userName.length > 4 && (
                                <ul className="suggestions-list text-secondary border border-gray-300 mt-2 rounded">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setUserName(suggestion.userName)
                                                setFilteredSuggestions([])
                                            }
                                            }
                                            className="px-4 py-2 hover:bg-light-blue cursor-pointer"
                                        >
                                            {suggestion.userName}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                            <label className="text-secondary font-semibold">{t("createPuzzle")} (+500€)</label>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-secondary font-semibold mb-2">{t("ajustPrice")} (%) :</label>
                        <select
                            name="priceAdjustment"
                            value={formData.priceAdjustment}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-tertiari text-secondary border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
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
                    <p className="text-secondary font-semibold text-lg">
                        {t('estimatePrice')} : <span className="text-light-blue">{priceDetails.finalPrice.toFixed(2)}€</span>
                    </p>
                </div>
                <div className="bg-tertiari p-4 rounded-lg mt-6">
                    <h2 className="text-xl font-bold text-secondary mb-4">{t("detailPrice")} :</h2>
                    <ul className="text-secondary">
                        <li>{t("basePrice")} : {priceDetails.basePrice}€</li>
                        <li>{t("majorationDateProche")} : {priceDetails.proximityCharge.toFixed(2)}€</li>
                        <li>{t("majorationDuree")} ({(priceDetails.durationCharge / 50).toFixed(2)} {t("day")})
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
