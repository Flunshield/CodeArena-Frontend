import React, {useEffect, useState} from 'react';
import {CINQUANTE, DIX, VINGT_CINQ} from "../constantes/constantes.ts";
import {useTranslation} from "react-i18next";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
    setItemPerPage: (value: number) => void;
    setCurrentPage?: (value: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder = "", onSearch, setItemPerPage, setCurrentPage}) => {
    const [searchValue, setSearchValue] = useState("");
    const {t} = useTranslation();

    function handleChangeItemPerPage(itemPerPage: number) {
        setItemPerPage(itemPerPage);
        setCurrentPage && setCurrentPage(1);    }

    useEffect(() => {
        if (searchValue.length > 3) {
            onSearch(searchValue);
        }
        if (searchValue.length === 0) {
            onSearch("");
        }
    }, [searchValue]);
    return (
        <div className="flex max-md:flex-col justify-center p-2">
            <div className="flex flex-col min-md:text-center mr-10">
                <label htmlFor="itemsPerPage" className="block text-sm font-medium text-tertiari max-md:text-left">
                    Eléments par page
                </label>
                <select
                    id="itemsPerPage"
                    className="text-secondary rounded-lg border border-gray-300 w-32 text-center mt-1"
                    onChange={(e) => handleChangeItemPerPage(parseInt(e.target.value)) }
                >
                    <option value={10}>{DIX}</option>
                    <option value={25}>{VINGT_CINQ}</option>
                    <option value={50}>{CINQUANTE}</option>
                </select>
            </div>
            <input
                type="search"
                placeholder={t(placeholder)}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{padding: '0.5rem', width: '200px', marginRight: '0.5rem'}}
                className=" text-secondary rounded-lg border border-gray-300 focus:outline-none focus:border-petroleum-blue"
            />
        </div>
    );
};

export default SearchBar;
