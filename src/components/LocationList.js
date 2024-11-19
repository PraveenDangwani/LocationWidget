import React from 'react';
import flagMapping from '../data/flagMapping'; // Import the flag mapping
import '../styles/LocationList.css';

const LocationList = ({ locations, locationRefs, selectedLocations, toggleLocation }) => {
  return (
    <div className="location-list">
      {locations.map((location, index) => {
        // Split location into city and country
        const [city, country] = location.split(" - "); // "Bangalore - India" -> city: "Bangalore", country: "India"
        const firstLetter = city[0].toUpperCase(); // Get the first letter of the city
        const isFirstOccurrence =
          index === 0 || firstLetter !== locations[index - 1][0].toUpperCase();

        // Get the flag URL from the mapping
        const flag = flagMapping[country];

        return (
          <div
            key={location}
            ref={isFirstOccurrence ? (el) => (locationRefs.current[firstLetter] = el) : null}
            className="location-item"
          >
            <input
              type="checkbox"
              checked={selectedLocations[location] || false}
              onChange={() => toggleLocation(location)}
            />
            <label>
              {flag && <img src={flag} alt={country} className="flag-icon" />} 
              {city} - {country}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default LocationList;
