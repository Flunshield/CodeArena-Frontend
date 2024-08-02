import {useTranslation} from "react-i18next";
import clsx from "clsx";

interface PaginationProps {
    currentPage: number;
    maxPage: number;
    item: unknown[];
    classNameCurrentPage?: string;
    setCurrentPage: (value: number) => void;
    setSubmitCount: (value: (count: number) => number) => void;
    itemPerPage?: number;
}

const Pagination = ({
                        currentPage,
                        setSubmitCount,
                        maxPage,
                        item,
                        classNameCurrentPage,
                        setCurrentPage,
                        itemPerPage = 10
                    }: PaginationProps) => {
    const {t} = useTranslation();


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        setSubmitCount(count => count + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        setSubmitCount(count => count + 1);
    };

    function renderPageNumbers() {
        const pageNumbers = [];

        for (let i = 1; i <= maxPage; i++) {
            if (
                i === 1 ||
                i === currentPage - 1 ||
                i === currentPage ||
                i === currentPage + 1 ||
                i === maxPage
            ) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={clsx(
                            "px-4 py-2 rounded-md text-tertiari ml-2",
                            i === currentPage ? "bg-gray-600" : "bg-petroleum-blue"
                        )}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                pageNumbers.push(
                    <span key={i} className="mx-2">
                        ...
                    </span>
                );
            }
        }

        return pageNumbers;
    }

    return (
        <table className="w-full">
            <tbody>
            <tr className="flex-row flex">
                <td className="py-4 text-center align-middle w-1/3">
                    {currentPage > 1 ? (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-tertiari"
                            onClick={prevPage}
                        >
                            {t('previous')}
                        </button>
                    ) : (
                        <div className="py-2 invisible">{t('previous')}</div>
                    )}
                </td>
                <td className="py-6 px-4 text-center align-middle w-1/3">
                    <p className={clsx(classNameCurrentPage, "max-lg:hidden")}>{renderPageNumbers()}</p>
                    <p className={clsx(classNameCurrentPage, "hidden max-lg:block")}>{currentPage}</p>
                </td>
                <td className="py-4 text-center align-middle w-1/3">
                    {maxPage > currentPage && item.length > (itemPerPage - 1) && (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-tertiari"
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