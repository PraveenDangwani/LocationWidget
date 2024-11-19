import React, { useState, useEffect, useRef } from 'react';
import SearchBox from './SearchBox';
import LocationList from './LocationList';
import AlphabetIndex from './AlphabetIndex';
import { sampleLocations } from '../data/locations';
import '../styles/LocationWidget.css';
import CollapseIcon from '../assets/icons/collapse.png'
import ExpandIcon from '../assets/icons/expand.png';
import MaximizeIcon from '../assets/icons/EndBtn.png';
import MinimizeIcon from '../assets/icons/minimise.png';

const LocationWidget = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [widgetState, setWidgetState] = useState('normal'); 
  const locationRefs = useRef({});

  // Initialize locations and selected state
  useEffect(() => {
    const sortedLocations = sampleLocations.sort((a, b) => a.localeCompare(b));
    setLocations(sortedLocations);
    setFilteredLocations(sortedLocations);

    const initialSelections = {};
    sortedLocations.forEach((loc) => {
      initialSelections[loc] = false;
    });
    setSelectedLocations(initialSelections);
  }, []);

  // Handle search input
  const handleSearch = (searchTerm) => {
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
    locationRefs.current = {}; // Reset refs when filtering
  };

  // Clear all selections
  const handleClearAll = () => {
    const clearedSelections = {};
    locations.forEach((loc) => {
      clearedSelections[loc] = false;
    });
    setSelectedLocations(clearedSelections);
  };

  // Toggle location selection
  const toggleLocation = (location) => {
    setSelectedLocations((prevSelections) => ({
        ...prevSelections,
        [location]: !prevSelections[location],
    }));
  };

  // Scroll to a specific letter
  const scrollToLetter = (letter) => {
    if (locationRefs.current[letter]) {
      locationRefs.current[letter].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Extract unique letters for AlphabetIndex
  const uniqueLetters = Array.from(
    new Set(filteredLocations.map((location) => location[0].toUpperCase()))
  );

  // Render icon button
  const renderIconButton = (tooltip, icon, onClick) => (
    <button className="tooltip icon-button" data-tooltip={tooltip} onClick={onClick}>
      <img src={icon} alt={tooltip} className="icon" />
    </button>
  );

  return (
    <div className={`location-widget ${widgetState}`}>
      {widgetState === 'normal' && (
        <>
          <div className="state-toggle-icons">
            {renderIconButton('Collapse', CollapseIcon, () => setWidgetState('collapsed'))}
            {renderIconButton('Minimize', MinimizeIcon, () => setWidgetState('minimized'))}
          </div>
          <h3>Locations</h3>
          <SearchBox onSearch={handleSearch} />
          <button className="clear-all-button" onClick={handleClearAll}>
          <i className="fas fa-times clear-all-icon"></i>Clear All
          </button>
          
          {filteredLocations.length > 0 ? (
            <LocationList
                locations={filteredLocations}
                locationRefs={locationRefs}
                selectedLocations={selectedLocations}
                toggleLocation={toggleLocation}
            />
            ) : (
            <p>No locations available.</p>
            )}
          <AlphabetIndex letters={uniqueLetters} scrollToLetter={scrollToLetter} />
        </>
      )}
      {widgetState === 'collapsed' && (
        <div className="collapsed-widget">
          <h3>Locations</h3>
          <div className="collapsed-buttons">
            {renderIconButton('Expand', ExpandIcon, () => setWidgetState('normal'))}
            {renderIconButton('Minimize', MinimizeIcon, () => setWidgetState('minimized'))}
          </div>
        </div>
      )}
      {widgetState === 'minimized' && (
        <div className="minimized-widget">
          {renderIconButton('Maximize', MaximizeIcon, () => setWidgetState('normal'))}
          <span className="minimized-widget-title">Locations</span>
        </div>
      )}
    </div>
  );
};

export default LocationWidget;
