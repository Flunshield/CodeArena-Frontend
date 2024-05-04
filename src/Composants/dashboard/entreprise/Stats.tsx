import {Pricing} from "../../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

interface StatsProps {
    lastCommande: Pricing | undefined;
    submitCount: number;
    nbPuzzlesPlayed: number;
    nbPuzzleCreated: number;
}

const stats = ({lastCommande, nbPuzzlesPlayed, nbPuzzleCreated}: StatsProps) => {
    const {t} = useTranslation();
    const stats = [
        {id: 1, title: t("abonnement"), value: lastCommande?.title ?? t("noAbonnement")},
        {id: 2, title: t("nbTestCreate"), value: nbPuzzleCreated + "/" + lastCommande?.nbCreateTest},
        {id: 3, title: t("nbTestRealized"), value: nbPuzzlesPlayed}
    ];

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