import React, { useState, useRef } from 'react';
import '../styles/SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState(''); 
  const debounceTimer = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onSearch(value); 
    }, 300); 
  };

  const handleClear = () => {
    setInputValue(''); // Clear the input field
    onSearch(''); // Reset the search results in the parent
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  return (
    <div className="search-box-wrapper">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Filter locations..."
        className="search-box"
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBox;
