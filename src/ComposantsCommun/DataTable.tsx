import clsx from 'clsx';
import {useTranslation} from "react-i18next";

interface HeaderDataTable {
    key: string;
    label: string;
}

interface DataTableProps {
    headers: HeaderDataTable[];
    data: Record<string, string | JSX.Element>[];
    className?: string;
    clickedUser?: (username: string) => void;
}

const DataTable = ({headers, data, className, clickedUser}: DataTableProps) => {
    const {t} = useTranslation();
    return (
        <div className={clsx("overflow-x-auto", className)}>
            <table className={clsx("w-full text-sm text-center text-gray-500 dark:text-gray-400")}>
                <thead className="text-xs text-secondary uppercase bg-tertiari dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {headers.map((header) => (
                        <th key={String(header.key)} scope="col" className="py-3 px-6">
                            {t(header.label)}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-soft-gray hover:text-tertiari" onClick={() => {
                        if (clickedUser) {
                            clickedUser(data[index].userName as string);
                        }
                    }}>
                        {headers.map((header) => (
                            <td key={header.key} className="py-4 px-6">
                                {String(item[header.key])}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
        ;
};

export default DataTable;