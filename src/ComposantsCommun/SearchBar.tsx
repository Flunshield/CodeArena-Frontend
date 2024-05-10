import React, {useEffect, useState} from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (searchValue.length > 3) {
            onSearch(searchValue);
        }
        if(searchValue.length === 0){
            onSearch("");
        }
    }, [searchValue]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <input
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ padding: '0.5rem', width: '200px', marginRight: '0.5rem' }}
        className=" text-secondary rounded-lg border border-gray-300 focus:outline-none focus:border-petroleum-blue"
      />
    </div>
  );
};

export default SearchBar;
