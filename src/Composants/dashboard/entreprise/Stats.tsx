import {DataToken, Pricing, PuzzlesEntreprise} from "../../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import {getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {useEffect, useState} from "react";

interface StatsProps {
    tabPuzzlesEntreprise: PuzzlesEntreprise[];
    lastCommande: Pricing | undefined;
}

const stats = ({tabPuzzlesEntreprise, lastCommande}: StatsProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser: JwtPayload = authContext?.infosUser as JwtPayload
    const infos: DataToken = infosUser.aud as unknown as DataToken
    const [puzzleFinish, setPuzzleFinish] = useState<PuzzlesEntreprise[]>([]);
    const stats = [
        {id: 1, title: t("abonnement"), value: lastCommande?.title ?? t("noAbonnement")},
        {id: 2, title: t("nbTestCreate"), value: tabPuzzlesEntreprise.length + "/" + lastCommande?.nbCreateTest},
        {id: 3, title: t("nbTestRealized"), value: puzzleFinish.length}
    ];
    const getPuzzleFinish = getElementByEndpoint(`entreprise/getPuzzlePlaying?id=${infos.data.id}`, {
        token: authContext.accessToken ?? "",
        data: ''
    });

    useEffect(() => {
        if (authContext.connected) {
            getPuzzleFinish.then(async (response) => {
                const result = await response.json();
                setPuzzleFinish(result);
            });
        }
    }, []);

    return (
        <div className="font-sans m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(stat => (
                <div key={stat.id}
                     className="bg-tertiari hover:bg-tertiari-light overflow-hidden shadow rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="text-sm font-medium text-quaternary truncate">{stat.title}</div>
                        <div className="mt-1 text-3xl font-semibold text-quaternary text-center">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default stats;