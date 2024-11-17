// src/components/LocationWidget.js
import React, { useState, useEffect, useRef } from 'react';
import SearchBox from './SearchBox';
import LocationList from './LocationList';
import AlphabetIndex from './AlphabetIndex';
import StateToggleIcons from './StateToggleIcons';
import { sampleLocations } from '../data/locations';
import '../styles/LocationWidget.css';
import ExpandIcon from '../assets/icons/expand.png'
// import CollapseIcon from '../assets/icons/collapse.png'
import MaximizeIcon from '../assets/icons/EndBtn.png'
import MinimizeIcon from '../assets/icons/minimise.png'

const LocationWidget = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [widgetState, setWidgetState] = useState('normal'); // 'normal', 'minimized', 'collapsed'
  const locationRefs = useRef({});

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

  const handleSearch = (searchTerm) => {
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
    locationRefs.current = {}; // Reset refs when filtering
  };

  const handleClearAll = () => {
    const clearedSelections = {};
    locations.forEach((loc) => {
      clearedSelections[loc] = false;
    });
    setSelectedLocations(clearedSelections);
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prevSelections) => ({
      ...prevSelections,
      [location]: !prevSelections[location],
    }));
  };

  const scrollToLetter = (letter) => {
    if (locationRefs.current[letter]) {
      locationRefs.current[letter].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const uniqueLetters = Array.from(
    new Set(filteredLocations.map((location) => location[0].toUpperCase()))
  );

  return (
    <div className={`location-widget ${widgetState}`}>
      {widgetState === 'normal' && (
        <>
          <div>
            {/* <button
              onClick={() => setWidgetState('collapsed')}
              className="collapse-button"
            >
              🗕
            </button> */}
            <StateToggleIcons setWidgetState={setWidgetState} widgetState={widgetState} />
          </div>
          <h3>Locations</h3>
          <SearchBox onSearch={handleSearch} />
          <button className="clear-all-button" onClick={handleClearAll}>
          <i className="fas fa-times clear-all-icon"></i>Clear All
          </button>
          <LocationList
            locations={filteredLocations}
            locationRefs={locationRefs}
            selectedLocations={selectedLocations}
            toggleLocation={toggleLocation}
          />
          <AlphabetIndex letters={uniqueLetters} scrollToLetter={scrollToLetter} />
        </>
      )}
      {widgetState === 'collapsed' && (
        <div className="collapsed-widget">
          <h3>Locations</h3>
          <div className="collapsed-buttons">
            <button
              className="expand-button tooltip"
              data-tooltip="Expand"
              onClick={() => setWidgetState('normal')}
            >
              <img src={ExpandIcon} alt="Expand" className="icon"></img>
            </button>
            <button
              className="minimize-button tooltip"
              data-tooltip="Minimize"
              onClick={() => setWidgetState('minimized')}
            >
              
              <img src={MinimizeIcon} alt="Minimize" className="icon"></img>
              
            </button>
          </div>
        </div>
      )}
      {widgetState === 'minimized' && (
        <div className="minimized-widget">
          
          <button
            className="minimized-maximize-button tooltip"
            data-tooltip="Maximize"
            onClick={() => setWidgetState('normal')}
          >
            <img src={MaximizeIcon} alt="Maximize" className="icon"></img>
          </button>
          <span className="minimized-widget-title">Locations</span>
        </div>
      )}
    </div>
  );
};

export default LocationWidget;
