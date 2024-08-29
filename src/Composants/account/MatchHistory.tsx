import React from 'react';
import {Match} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import useUserInfos from "../../hook/useUserInfos.ts";
import clsx from "clsx";

interface MatchHistoryProps {
    historiqueMatch: Match[];
}

const MatchHistory: React.FC<MatchHistoryProps> = ({historiqueMatch}) => {
    const {t} = useTranslation();
    const infosUser = useUserInfos();

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="p-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-6">{t('historyMatch')}</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-200 text-gray-600">
                            <tr>
                                <th className="py-3 px-4 border-b">{t('Statut')}</th>
                                <th className="py-3 px-4 border-b">{t('date')}</th>
                                <th className="py-3 px-4 border-b">{t('duree')}</th>
                                <th className="py-3 px-4 border-b">{t('score')}</th>
                                <th className="py-3 px-4 border-b">{t('winner')}</th>
                                <th className="py-3 px-4 border-b">{t('loser')}</th>
                                <th className="py-3 px-4 border-b">{t('pointSWin')}</th>

                            </tr>
                            </thead>
                            <tbody>
                            {historiqueMatch.map(match => (
                                <tr key={match.id} className="">
                                    <td className="py-2 px-4 border-b text-center">{match?.status}</td>
                                    <td className="py-2 px-4 border-b text-center">{match.date.toString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{match.time.toString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{match?.score}</td>
                                    <td className="py-2 px-4 border-b text-center"><span
                                        className={clsx(match?.winner.userName === infosUser.userName ? "bg-olive-green" : "bg-soft-gray", "p-2 rounded-xl text-tertiari")}>{match?.winner.userName}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b rounded-xl text-center"><span
                                        className={clsx(match?.loser.userName === infosUser.userName ? "bg-olive-green" : "bg-soft-gray", "p-2 rounded-xl text-tertiari")}> {match?.loser.userName}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{match?.loser.userName === infosUser.userName ? match.loserPoints : match.winnerPoints}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchHistory;
