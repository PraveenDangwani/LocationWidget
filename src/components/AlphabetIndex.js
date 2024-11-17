// src/components/AlphabetIndex.js
import React from 'react';
import '../styles/AlphabetIndex.css'

const AlphabetIndex = ({ letters, scrollToLetter }) => {
  return (
    <div className="alphabet-index">
      {letters.map((letter) => (
        <button key={letter} onClick={() => {scrollToLetter(letter)}}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetIndex;
