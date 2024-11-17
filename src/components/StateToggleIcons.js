// src/components/StateToggleIcons.js
import React from 'react';
import CollapseIcon from '../assets/icons/collapse.png'
import MinimizeIcon from '../assets/icons/minimise.png'
import '../styles/StateToggleIcons.css'



const StateToggleIcons = ({ setWidgetState, widgetState }) => {
  return (
    <div className="state-toggle-icons">
      {widgetState !== 'collapsed' && (
        <button className="collapse-button tooltip" data-tooltip="Collapse" onClick={() => setWidgetState('collapsed')}>
            <img src={CollapseIcon} alt="Minimize" className="icon"></img>
        </button>
      )}
      {widgetState !== 'minimized' && (
        <button className="minimize-button tooltip" data-tooltip="Minimize" onClick={() => setWidgetState('minimized')}>
            <img src={MinimizeIcon} alt="Minimize" className="icon"></img>
        </button>
      )}
      {widgetState !== 'normal' && (
        <button onClick={() => setWidgetState('normal')}>Expand</button>
      )}
    </div>
  );
};

export default StateToggleIcons;
