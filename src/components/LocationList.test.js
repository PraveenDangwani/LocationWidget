import { render, screen, fireEvent } from '@testing-library/react';
import LocationList from './LocationList';

describe('LocationList Component', () => {
  const mockToggleLocation = jest.fn();

  it('renders all locations with checkboxes', () => {
    const locations = ['Amsterdam - Netherlands', 'Berlin - Germany'];
    const selectedLocations = { 'Amsterdam - Netherlands': false, 'Berlin - Germany': false };

    render(
      <LocationList 
        locations={locations} 
        selectedLocations={selectedLocations} 
        toggleLocation={mockToggleLocation} 
        locationRefs={{ current: {} }} 
      />
    );

    locations.forEach(location => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });

  it('toggles location selection on checkbox click', () => {
    const locations = ['Amsterdam - Netherlands'];
    const selectedLocations = { 'Amsterdam - Netherlands': false };

    render(
      <LocationList 
        locations={locations} 
        selectedLocations={selectedLocations} 
        toggleLocation={mockToggleLocation} 
        locationRefs={{ current: {} }} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleLocation).toHaveBeenCalledWith('Amsterdam - Netherlands');
  });
});
