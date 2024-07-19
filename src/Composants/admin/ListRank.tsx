import React from "react";
import { Ranking } from "../../Interface/Interface.ts";
import { useTranslation } from "react-i18next";

interface ListRankProps {
    ranks: Ranking[];
}

const ListRank: React.FC<ListRankProps> = ({ ranks }) => {
    const { t } = useTranslation();

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-tertiari mb-4">{t('listRank')}</h2>
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left text-secondary">
                    <thead className="text-xs uppercase bg-tertiari">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {t('labelRank')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t('minPoint')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t('maxPoint')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t('descriptionRank')}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {ranks.map((rank: Ranking) => (
                        <tr key={rank.id} className="bg-tertiari border-b">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-light-blue whitespace-nowrap"
                            >
                                {rank.title}
                            </th>
                            <td className="px-6 py-4">{rank.minPoints}</td>
                            <td className="px-6 py-4">{rank.maxPoints}</td>
                            <td className="px-6 py-4">{rank.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListRank;