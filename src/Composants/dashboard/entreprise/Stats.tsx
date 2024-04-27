import {Pricing, PuzzlesEntreprise} from "../../../Interface/Interface.ts";

interface StatsProps {
    tabPuzzlesEntreprise: PuzzlesEntreprise[];
    lastCommande: Pricing | undefined;
}

const stats = ({tabPuzzlesEntreprise, lastCommande}: StatsProps) => {
    const stats = [
        {id: 1, title: "Abonnement", value: lastCommande?.title ?? "Aucun abonnement"},
        {id: 2, title: "Nombre de test créé", value: tabPuzzlesEntreprise.length + "/" + lastCommande?.nbCreateTest},
        {id: 3, title: "Nombre de test réalisé", value: "58"} // TODO: Récupérer le nombre de test réalisé
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