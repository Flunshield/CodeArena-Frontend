import React, {useEffect, useState} from "react";
import {ArrayItem, CommandeEntreprise, DataToken, Event} from "../../../Interface/Interface.ts";
import {getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {formatDate, formatItemCommande} from "../../../Helpers/formatHelper.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {HEADER_FACTURE, PRICING} from "../../../constantes/constanteEntreprise.ts";
import clsx from "clsx";
import Pagination from "../../../ComposantsCommun/Pagination.tsx";
import {ITEMS_PER_PAGE_DIX} from "../../../constantes/constantes.ts";

interface historiqueAchatProps {
    className?: string;
}

const historiqueAchat = ({className}: historiqueAchatProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const [submitCount, setSubmitCount] = useState(0);
    const [commande, setCommande] = useState<{ event: Event, commande: CommandeEntreprise }>();
    const [ispopupOpen, setIsPopupOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [commandes, setCommandes] = React.useState<ArrayItem>({item: [], total: 0});
    const getAllCommande = getElementByEndpoint('entreprise/getAllCommandeForUser?id=' + infos.data.id + "&page=" + currentPage, {
        data: "",
        token: authContext.accessToken ?? ""
    })

    const maxPage = commandes.item.length > 0 ? Math.ceil(commandes.total / ITEMS_PER_PAGE_DIX) : 1;

    const lastCommandFormatted = formatItemCommande(commandes.item);

    function closePopup() {
        setIsPopupOpen(false);
    }

    async function getCommandeSelected(commandeSelected: CommandeEntreprise) {
        await getElementByEndpoint('entreprise/getCommande?id=' + commandeSelected?.id + '&userId=' + infos.data.id, {
            data: "",
            token: authContext.accessToken ?? ""
        })
            .then(async (response) => {
                const result = await response.json();
                setCommande(result);
                setSubmitCount(submitCount + 1);
            });
    }

    useEffect(() => {
        getAllCommande.then(async (response) => {
            const result = await response.json();
            setCommandes(result);
        });
    }, [submitCount, currentPage]);

    return (
        <div id="historiqueAchat" className={className}>
            <h2 className="text-2xl text-center text-secondary font-bold">{t('historiqueAchat')}</h2>
            <div className="overflow-x-auto m-5 rounded-lg">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-secondary uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {HEADER_FACTURE.map((header) => (
                            <th key={header.key} scope="col" className="py-3 px-6">
                                {t(header.label)}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {lastCommandFormatted.map((commande) => (
                        <tr key={commande.id} onClick={async () => {
                            await getCommandeSelected(commande)
                            setIsPopupOpen(true)
                        }}
                            className="bg-tertiari border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-soft-gray hover:text-tertiari">
                            <td className="py-4 px-6">{PRICING.find((pricing) => pricing.idApi === commande.item)?.title ?? "Partenariat"}</td>
                            <td className="py-4 px-6">
                                {formatDate(commande.dateCommande, t)}
                            </td>
                            <td className="py-4 px-6">{commande.idPayment}</td>
                            <td className="py-4 px-6"><span
                                className={clsx(commande.colorEtatCommande, "p-1.5 rounded-lg ")}>{t(commande.etatCommande)}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination item={lastCommandFormatted} maxPage={maxPage} currentPage={currentPage}
                            classNameCurrentPage="text-tertiari" setCurrentPage={setCurrentPage}
                            setSubmitCount={setSubmitCount}/>
            </div>
            <div className="flex justify-between items-center w-full">
            </div>
            {ispopupOpen && (
                <div
                    className="fixed top-0 left-0 z-50 p-4 lg:p-8 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-tertiari p-8 rounded-md shadow-lg max-h-full w-auto overflow-y-auto">
                        {commande && (
                            <div>
                                <h1 className="text-center text-2xl">{PRICING.find((pricing) => pricing.idApi === commande.commande.item)?.title ?? commande.event.title}</h1>
                                <div className="flex flex-col flex-start space-y-5 m-5 break-words">
                                    <p className="text-lg">
                                        <span
                                            className="font-bold">Type</span> : {commande.event ? "Partenariat" : "Abonnement"}
                                    </p>
                                    <p className="text-lg">
                                        <span
                                            className="font-bold">{t('dateCommande')}</span> : {formatDate(commande.commande.dateCommande, t)}
                                    </p>
                                    <p className="text-lg">
                                        <span
                                            className="font-bold">{t('idPayment')}</span> : {commande.commande.idPayment}
                                    </p>
                                    <p className="text-lg">
                                        <span
                                            className="font-bold">{t('prix')} :</span> {PRICING.find((pricing) => pricing.idApi === commande.commande.item)?.price ? (PRICING.find((pricing) => pricing.idApi === commande.commande.item)?.price + "/" + t('perMonth')) : (commande.event.priceDetails.finalPrice + "€")}
                                    </p>
                                    {commande.commande.nbCreateTest !== 0 && (
                                        <p className="text-lg">
                                            <span
                                                className="font-bold">{t('nbCreateTest')}</span> : {commande.commande.nbCreateTest}
                                        </p>
                                    )}
                                    <p className="text-lg">
                                        <span className="font-bold">{t('etatCommande')}</span> : <span
                                        className={clsx(commande.commande.colorEtatCommande, "p-1.5 rounded-lg ")}>{t(commande.commande.etatCommande)}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={closePopup}
                            className="absolute top-2 right-2 rounded-full bg-error hover:bg-tertiary-light text-tertiari font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            X
                        </button>
                    </div>
                </div>

            )}
        </div>
    );
}

export default historiqueAchat;