import clsx from 'clsx';

interface HeaderDataTable<T> {
    key: keyof T;
    label: string;
}

interface DataTableProps<T> {
    headers: HeaderDataTable<T>[];
    data: T[];
    className?: string;
}

const DataTable = <T, >({headers, data, className}: DataTableProps<T>) => {
    return (
        <table className={clsx(className, "w-full text-sm text-center text-gray-500 dark:text-gray-400")}>
            <thead className="text-xs text-secondary uppercase bg-tertiari dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headers.map((header) => (
                    <th key={String(header.key)} scope="col" className="py-3 px-6">
                        {header.label}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {headers.map((header) => (
                        <td key={String(header.key)} className="py-4 px-6">
                            {String(item[header.key])}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;
