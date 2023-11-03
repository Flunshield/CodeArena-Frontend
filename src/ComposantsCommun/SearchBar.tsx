import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void; // Callback function when search is performed
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <input
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleSearch}
        style={{ padding: '0.5rem', width: '200px', marginRight: '0.5rem' }}
      />
      <button onClick={() => onSearch && onSearch(searchValue)} style={{ padding: '0.5rem' }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
