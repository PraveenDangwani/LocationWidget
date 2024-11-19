import React, { useState } from 'react';
import '../styles/SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState(''); // State for search input

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // Update the local state
    onSearch(value); // Pass the value to the parent handler
  };

  const handleClear = () => {
    setInputValue(''); // Clear the input field
    onSearch(''); // Reset the search results in the parent
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
