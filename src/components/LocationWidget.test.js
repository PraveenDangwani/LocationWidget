import { render, screen, fireEvent } from '@testing-library/react';
import LocationWidget from './LocationWidget';
  
// Mock scrollIntoView for all elements
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mocking locations data globally
jest.mock('../data/locations', () => {
    return { sampleLocations: [
      'Amsterdam - Netherlands',
      'Berlin - Germany',
      'Athens - Greece',
      'Bangalore - India',
    ],}
  });

describe('LocationWidget Component', () => {
    
  it('renders the widget with default state', () => {
    render(<LocationWidget />);
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('switches to collapsed state when Collapse button is clicked', () => {
    render(<LocationWidget />);
    const collapseButton = screen.getByAltText('Collapse');
    fireEvent.click(collapseButton);

    // Verify the widget switches to collapsed state
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Filter locations...')).not.toBeInTheDocument();
  });

  it('switches to minimized state when Minimize button is clicked', () => {
    render(<LocationWidget />);
    const minimizeButton = screen.getByAltText('Minimize');
    fireEvent.click(minimizeButton);

    // Verify the widget switches to minimized state
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Filter locations...')).not.toBeInTheDocument();
  });

  it('handles the Clear All button functionality', () => {
    jest.isolateModules(() => {
        jest.doMock('../data/locations', () => ({
          sampleLocations: ['Amsterdam', 'Berlin'],
        }));
        render(<LocationWidget />);
        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]); // Select the first checkbox
        expect(checkboxes[0]).toBeChecked();

        const clearAllButton = screen.getByText(/Clear All/i);
        fireEvent.click(clearAllButton);

        // Verify all checkboxes are unchecked
        checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
        });
    });
  });

  it('filters locations correctly based on search input', () => {
    render(<LocationWidget />);
    const searchBox = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(searchBox, { target: { value: 'Berlin' } });

    // Verify the filtered location is visible
    expect(screen.getByText('Berlin - Germany')).toBeInTheDocument();
    expect(screen.queryByText('Amsterdam - Netherlands')).not.toBeInTheDocument();
  });

  it('toggles location selection correctly', () => {
    render(<LocationWidget />);
    const checkboxes = screen.getAllByRole('checkbox');

    // Toggle the first checkbox
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    // Toggle it again
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });

  it('scrolls to a specific letter when AlphabetIndex is clicked', () => {
    render(<LocationWidget />);
    const letterButton = screen.getByText('A'); // Assuming 'A' is rendered in the AlphabetIndex
    fireEvent.click(letterButton);

    // Verify scrollIntoView was called
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('switches back to normal state when Expand or Maximize button is clicked', () => {
    render(<LocationWidget />);

    // Collapse and expand
    const collapseButton = screen.getByAltText('Collapse');
    fireEvent.click(collapseButton);
    const expandButton = screen.getByAltText('Expand');
    fireEvent.click(expandButton);
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();

    // Minimize and maximize
    const minimizeButton = screen.getByAltText('Minimize');
    fireEvent.click(minimizeButton);
    const maximizeButton = screen.getByAltText('Maximize');
    fireEvent.click(maximizeButton);
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
  });
  
});
