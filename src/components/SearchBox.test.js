import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  it('renders input with placeholder', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', () => {
    const mockOnSearch = jest.fn(); 
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } }); // Simulate input change

    // Verify onSearch is called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('Berlin');
  });

  it('does not show the Clear button when input is empty', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    const clearButton = screen.queryByText('Clear'); // Check for Clear button
    expect(clearButton).not.toBeInTheDocument();
  });

  it('shows the Clear button when input has text', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } }); // Simulate input change

    const clearButton = screen.getByText('Clear'); // Check for Clear button
    expect(clearButton).toBeInTheDocument();
  });

  it('clears the input and calls onSearch with an empty string when Clear is clicked', () => {
    const mockOnSearch = jest.fn(); 
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } }); // Simulate input change
    expect(input.value).toBe('Berlin'); // Verify input value is updated

    const clearButton = screen.getByText('Clear'); // Get Clear button
    fireEvent.click(clearButton); // Simulate click on Clear button

    // Verify input is cleared
    expect(input.value).toBe('');

    // Verify onSearch is called with an empty string
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
