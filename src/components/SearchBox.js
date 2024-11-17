// src/components/SearchBox.js
import React from 'react';
import { debounce } from 'lodash';
import '../styles/SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const handleChange = debounce((event) => {
    onSearch(event.target.value);
  }, 300);

  return (
    <div className="search-box-wrapper">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Filter locations..."
        onChange={handleChange}
        className="search-box"
      />
    </div>
  );
};

export default SearchBox;
