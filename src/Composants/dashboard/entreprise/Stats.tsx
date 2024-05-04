import {DataToken, Pricing} from "../../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";

interface StatsProps {
    lastCommande: Pricing | undefined;
    submitCount: number;
}

const stats = ({lastCommande, submitCount}: StatsProps) => {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const {t} = useTranslation();
    const [nbPuzzlesPlayed, setNbPuzzlesPlayed] = useState();
    const [nbPuzzleCreated, setNbPuzzleCreated] = useState();

    const fetchData = async () => {
        return await getElementByEndpoint(`puzzle/countPuzzles?id=${infos.data.id}`, {
            token: authContext.accessToken ?? "",
            data: ''
        });
    };
    const stats = [
        {id: 1, title: t("abonnement"), value: lastCommande?.title ?? t("noAbonnement")},
        {id: 2, title: t("nbTestCreate"), value: nbPuzzleCreated + "/" + lastCommande?.nbCreateTest},
        {id: 3, title: t("nbTestRealized"), value: nbPuzzlesPlayed}
    ];

    useEffect(() => {
        fetchData().then(async (response) => {
            const result = await response.json();
            if (response.status === 200) {
                console.log(result)
                setNbPuzzlesPlayed(result.puzzlesPlayed);
                setNbPuzzleCreated(result.puzzleCreate);
            }
        });
    }, [submitCount]);
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