import React, {useEffect, useState} from "react";
import {ArrayItem, DataToken} from "../../../Interface/Interface.ts";
import {getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {formatItemCommande} from "../../../Helpers/formatHelper.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {HEADER_FACTURE} from "../../../constantes/constanteEntreprise.ts";
import clsx from "clsx";
import Pagination from "../../../ComposantsCommun/Pagination.tsx";

interface historiqueAchatProps {
    className?: string;
}

const historiqueAchat = ({className}: historiqueAchatProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const [submitCount, setSubmitCount] = useState(0);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [commandes, setCommandes] = React.useState<ArrayItem>({item: [], total: 0});
    const getAllCommande = getElementByEndpoint('entreprise/getAllCommandeForUser?id=' + infos.data.id + "&page=" + currentPage, {
        data: "",
        token: authContext.accessToken ?? ""
    })

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        setSubmitCount(count => count + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        setSubmitCount(count => count + 1);
    };

    const maxPage = Math.ceil(commandes.total / commandes.item.length);

    const lastCommandFormatted = formatItemCommande(commandes.item, t);
    useEffect(() => {
        getAllCommande.then(async (response) => {
            const result = await response.json();
            setCommandes(result);
        });
    }, [submitCount]);
    return (
        <div id="historiqueAchat" className={className}>
            <h2 className="text-2xl text-center text-tertiari font-bold">{t('historiqueAchat')}</h2>
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
                        <tr key={commande.id}
                            className="bg-tertiari border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-soft-gray hover:text-tertiari">
                            <td className="py-4 px-6">{commande.item}</td>
                            <td className="py-4 px-6">{commande.dateCommande as string}</td>
                            <td className="py-4 px-6">{commande.idPayment}</td>
                            <td className="py-4 px-6"><span
                                className={clsx(commande.colorEtatCommande, "p-1.5 rounded-lg ")}>{commande.etatCommande}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination item={lastCommandFormatted} maxPage={maxPage} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} classNameCurrentPage="text-tertiari"/>
            </div>
            <div className="flex justify-between items-center w-full">
            </div>
        </div>
    )
}

export default historiqueAchat;