import {PuzzlesEntreprise} from "../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

interface PaginationProps {
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
    maxPage: number;
    item: PuzzlesEntreprise[];
    classNameCurrentPage?: string;
}

const Pagination = ({ currentPage, prevPage, nextPage, maxPage, item, classNameCurrentPage }: PaginationProps) => {
    const {t} = useTranslation();

    return (
        <table className="w-full">
            <tbody>
            <tr className="flex-row flex">
                <td className="py-4 text-center align-middle w-1/3">
                    {currentPage > 1 ? (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={prevPage}
                        >
                            {t('previous')}
                        </button>
                    ) : (
                        <div className="py-2 invisible">{t('previous')}</div>
                    )}
                </td>
                <td className="py-6 px-4 text-center align-middle w-1/3">
                    <p className={classNameCurrentPage}>{currentPage}</p>
                </td>
                <td className="py-4 text-center align-middle w-1/3">
                    {maxPage > currentPage && item.length > 3 && (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={nextPage}
                        >
                            {t('next')}
                        </button>
                    )}
                </td>
            </tr>
            </tbody>
        </table>
    )
}

export default Pagination;