import React, {useEffect} from "react";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {PRICING} from "../../constantes/constanteEntreprise.ts";

const stats: React.FC = () => {
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const stats = [
        {id: 1, title: "Abonnement", value: checkLastCommande().title},
        {id: 2, title: "Nombre de test créé", value: infos.data.puzzlesEntreprise.length + "/" + checkLastCommande().nbCreateTest},
        {id: 3, title: "Nombre de test réalisé", value: "58"}
    ];

    function checkLastCommande() {
        const tabCommande = infos.data.commandeEntreprise ?? []
        let lastCommande = null;
        if (tabCommande.length > 0) {
            lastCommande = PRICING.find((elem) => {
                return elem.idApi === tabCommande[tabCommande.length - 1].item
            })
        }
        return lastCommande ?? {title: "Aucun abonnement", nbCreateTest: 0}
    }

    useEffect(() => {
        const nbCreateTest = checkLastCommande().nbCreateTest;
        const puzzleForm = document.getElementById("Puzzle-form");

        if(puzzleForm !== null) {
                const parsedNbCreateTest = parseInt(nbCreateTest.toString(), 10); // Toujours spécifier une base pour parseInt
                if (infos.data.puzzlesEntreprise.length >= parsedNbCreateTest) {
                    puzzleForm.classList.add("hidden");
                }
        }
    }, []);

    return (
        <div className="m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(stat => (
                <div key={stat.id} className="bg-tertiari overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div
                            className="text-sm font-medium text-gray-500 truncate">{stat.title}</div>
                        <div
                            className="mt-1 text-3xl font-semibold text-gray-900 text-center">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default stats;