import React from "react";
import {Ranking} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

interface ListTitleProps {
    ranks: Ranking[];

}

const ListRank: React.FC<ListTitleProps> = (data) => {
    const {t} = useTranslation();
    const {ranks} = data;
    return (
        <div>
            <h2>{t('listRank')}</h2>
            <ul className="flex flex-wrap">
                {ranks.map((ranks: Ranking) => (
                    <li key={ranks.id} className="m-5 p-5 border-2 rounded-lg">
                        <p>
                            {t('labelRank')} : <span className="font-bold">{ranks.title}</span>
                        </p>
                        <p>
                            {t('minPoint')} : <span
                            className="font-bold">{ranks.minPoints}</span>
                        </p>
                        <p>
                            {t('maxPoint')} : <span
                            className="font-bold">{ranks.maxPoints}</span>
                        </p>
                        <p>
                            {t('descriptionRank')} : <span
                            className="font-bold">{ranks.description}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListRank;