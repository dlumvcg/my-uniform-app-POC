import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export type SearchProps = {
  onSearch: (searchTerm: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="search__container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search for more RGP Videos"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        aria-label="Search input"
        aria-describedby="searchButton"
      />
      <button onClick={handleSearch} aria-label="Search Button" id="searchButton">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <label aria-labelledby="searchInput"></label>
    </div>
  );
};
export default Search;
