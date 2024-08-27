import {useTranslation} from "react-i18next";
import {useState} from "react";
import {CINQUANTE, CODE_LANGUAGES_FAVORITES, DIX, VINGT_CINQ} from "../constantes/constantes.ts";
import clsx from "clsx"; // Assurez-vous d'importer vos constantes correctement

interface SearchBarProps {
    onSearch?: (username: string) => void;
    setItemPerPage: (value: number) => void;
    placeholder: string;
    setCurrentPage: (page: number) => void;
    setLanguagePreference?: (value: string) => void;
    setOrder?: (value: string) => void;
    setAccepted?: (value: string) => void;
    isEntreprise?: boolean;
    isAdmin?: boolean;
    className?: string;
    setSearchTitle?: (value: string) => void;
}

const SearchBar = ({
                       onSearch,
                       setItemPerPage,
                       placeholder,
                       setCurrentPage,
                       setLanguagePreference,
                       setOrder,
                       setAccepted,
                       isEntreprise = false,
                       isAdmin = false,
                       className,
                       setSearchTitle
                   }: SearchBarProps): JSX.Element => {
    const {t} = useTranslation();
    const [searchValue, setSearchValue] = useState("");

    const handleChangeItemPerPage = (value: number) => {
        setItemPerPage(value);
        setCurrentPage(1); // Reset current page when changing items per page
    };

    const handleSearch = (value: string) => {
        if (setLanguagePreference) {
            setLanguagePreference(value);
        }
        if (setOrder) {
            setOrder(value);
        }
    }

    const handleAccepted = (value: string) => {
        if (setAccepted) {
            setAccepted(value);
        }
    }

    return (
        <div
            className={clsx(className, "flex items-center max-lg:flex-col justify-center p-2 shadow-md bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-lg mb-4")}>
            {isEntreprise && (
                <div className="flex flex-col max-md:text-center mr-10 mb-2 max-md:mb-0">
                    <label htmlFor="technologiePreferences"
                           className="block text-sm font-medium text-tertiary max-md:text-left">
                        {t('technologiePreference')}
                    </label>
                    <select
                        id="technologiePreferences"
                        className="text-secondary rounded-lg border border-gray-300 w-32 text-center mt-1 focus:outline-none focus:border-primary"
                        onChange={(e) => handleSearch(e.target.value)}
                    >
                        <option key="all" value="all">{t('all')}</option>
                        {
                            CODE_LANGUAGES_FAVORITES.map(language => (
                                <option key={language} value={language}>{language}</option>
                            ))
                        }
                    </select>
                </div>
            )}
            {isAdmin && (
                <>
                    <div className="flex flex-col text-center mr-10 mb-2 max-md:mb-0">
                        <label htmlFor="technologiePreferences"
                               className="block text-sm font-medium text-tertiary max-md:text-left">
                            {t('Trie par date')}
                        </label>
                        <select
                            id="technologiePreferences"
                            className="text-secondary rounded-lg border border-gray-300 w-32 text-center mt-1 focus:outline-none focus:border-primary"
                            onChange={(e) => handleSearch(e.target.value)}
                        >
                            <option key="asc" value="asc">{t("Ascendant")}</option>
                            <option key="desc" value="desc">{t("Descendant")}</option>
                        </select>
                    </div>
                    <div className="flex flex-col text-center mr-10 mb-2 max-md:mb-0">
                        <label htmlFor="isAccepted"
                               className="block text-sm font-medium text-tertiary max-md:text-left">
                            {t('accepted')}
                        </label>
                        <select
                            id="isAccepted"
                            className="text-secondary rounded-lg border border-gray-300 w-32 text-center mt-1 focus:outline-none focus:border-primary"
                            onChange={(e) => handleAccepted(e.target.value)}
                        >
                            <option key="all" value="all">{t("all")}</option>
                            <option key="oui" value="oui">{t("yes")}</option>
                            <option key="non" value="non">{t("no")}</option>
                        </select>
                    </div>
                </>
            )}
            <div className="flex flex-col max-md:text-center mr-10 mb-2 max-md:mb-0">
                <label htmlFor="itemsPerPage" className="block text-sm font-medium text-tertiary max-md:text-left">
                    {t('elementPerPage')}
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
                onChange={(e) => {
                    setSearchValue(e.target.value)
                    if (onSearch) {
                        onSearch(e.target.value);
                    }
                    if (setSearchTitle) {
                        setSearchTitle(e.target.value);
                    }
                }}
                className="text-secondary rounded-lg border border-gray-300 focus:outline-none focus:border-primary px-4 py-2"
            />
        </div>
    )
        ;
};

export default SearchBar;
