import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DIX, VINGT_CINQ, CINQUANTE } from "../constantes/constantes.ts"; // Assurez-vous d'importer vos constantes correctement

interface SearchBarProps {
    onSearch: (username: string) => void;
    setItemPerPage: (value: number) => void;
    placeholder: string;
    setCurrentPage: (page: number) => void;
}

const SearchBar = ({ setItemPerPage, placeholder, setCurrentPage }: SearchBarProps): JSX.Element => {
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState("");

    const handleChangeItemPerPage = (value: number) => {
        setItemPerPage(value);
        setCurrentPage(1); // Reset current page when changing items per page
    };

    return (
        <div className="flex items-center max-md:flex-col justify-center p-2 shadow-md bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-lg mb-4">
            <div className="flex flex-col max-md:text-center mr-10 mb-2 max-md:mb-0">
                <label htmlFor="itemsPerPage" className="block text-sm font-medium text-tertiary max-md:text-left">
                    {t('Eléments par page')}
                </label>
                <select
                    id="itemsPerPage"
                    className="text-secondary rounded-lg border border-gray-300 w-32 text-center mt-1 focus:outline-none focus:border-primary"
                    onChange={(e) => handleChangeItemPerPage(parseInt(e.target.value))}
                >
                    <option value={10}>{t(DIX)}</option>
                    <option value={25}>{t(VINGT_CINQ)}</option>
                    <option value={50}>{t(CINQUANTE)}</option>
                </select>
            </div>
            <input
                type="search"
                placeholder={t(placeholder)}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="text-secondary rounded-lg border border-gray-300 focus:outline-none focus:border-primary px-4 py-2"
            />
        </div>
    );
};

export default SearchBar;
