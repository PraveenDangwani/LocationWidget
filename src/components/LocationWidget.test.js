import { render, screen, fireEvent, act } from '@testing-library/react';
import LocationWidget from './LocationWidget';

// Mock scrollIntoView for all elements
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mocking locations data globally
jest.mock('../data/locations', () => {
  return {
    sampleLocations: [
      'Amsterdam - Netherlands',
      'Berlin - Germany',
      'Athens - Greece',
      'Bangalore - India',
    ],
  };
});

describe('LocationWidget Component', () => {
  it('filters locations correctly based on search input', async () => {
    render(<LocationWidget />);
    const searchBox = screen.getByPlaceholderText('Filter locations...');

    // Simulate typing in the search box
    await act(async () => {
      fireEvent.change(searchBox, { target: { value: 'Berlin' } });
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for debounce
    });

    // Verify the filtered location is visible
    expect(screen.getByText('Berlin - Germany')).toBeInTheDocument();
    expect(screen.queryByText('Amsterdam - Netherlands')).not.toBeInTheDocument();
  });

  it('renders the widget with default state', () => {
    render(<LocationWidget />);
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('handles the Clear All button functionality', () => {
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

  it('shows "No locations available" when no filtered locations exist', async () => {
    render(<LocationWidget />);
    const searchBox = screen.getByPlaceholderText('Filter locations...');

    // Simulate a search with no matching results
    await act(async () => {
      fireEvent.change(searchBox, { target: { value: 'NonExistentLocation' } });
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for debounce
    });

    // Verify the "No locations available" message is displayed
    expect(screen.getByText('No locations available.')).toBeInTheDocument();
  });

  it('renders the widget in collapsed state', () => {
    render(<LocationWidget />);
    const collapseButton = screen.getByAltText('Collapse');
    fireEvent.click(collapseButton);

    // Verify the widget is in collapsed state
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Filter locations...')).not.toBeInTheDocument();
  });

  it('renders the widget in minimized state', () => {
    render(<LocationWidget />);
    const minimizeButton = screen.getByAltText('Minimize');
    fireEvent.click(minimizeButton);

    // Verify the widget is in minimized state
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Filter locations...')).not.toBeInTheDocument();
  });

  it('renders the widget back to normal state when expanded or maximized', () => {
    render(<LocationWidget />);

    // Simulate collapsing and then expanding the widget
    const collapseButton = screen.getByAltText('Collapse');
    fireEvent.click(collapseButton);
    const expandButton = screen.getByAltText('Expand');
    fireEvent.click(expandButton);

    // Verify the widget is back to normal state
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();

    // Simulate minimizing and then maximizing the widget
    const minimizeButton = screen.getByAltText('Minimize');
    fireEvent.click(minimizeButton);
    const maximizeButton = screen.getByAltText('Maximize');
    fireEvent.click(maximizeButton);

    // Verify the widget is back to normal state
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
  });

  it('scrolls to a specific letter when AlphabetIndex is clicked', () => {
    render(<LocationWidget />);
    const letterButton = screen.getByText('A'); // Assuming 'A' is rendered in the AlphabetIndex
    fireEvent.click(letterButton);

    // Verify scrollIntoView was called
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
