import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  it('renders input with placeholder', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Filter locations...')).toBeInTheDocument();
  });

  it('calls onSearch when input value changes with debounce', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } });

    // Wait for debounce delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(mockOnSearch).toHaveBeenCalledWith('Berlin');
  });

  it('does not show the Clear button when input is empty', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    const clearButton = screen.queryByText('Clear');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('shows the Clear button when input has text', () => {
    render(<SearchBox onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } });

    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears the input and calls onSearch with an empty string when Clear is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');
    fireEvent.change(input, { target: { value: 'Berlin' } });
    expect(input.value).toBe('Berlin');

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('clears the debounce timer when typing rapidly', () => {
    jest.useFakeTimers(); // Use fake timers for precise control

    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');

    // Simulate rapid typing
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.change(input, { target: { value: 'Am' } });
    fireEvent.change(input, { target: { value: 'Ams' } });

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(300); // Simulate debounce interval
    });

    // Ensure onSearch is called only once with the final value
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Ams');

    jest.useRealTimers(); // Restore real timers
  });

  it('does not call onSearch if the input value is cleared before debounce finishes', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Filter locations...');

    // Simulate input change and clearing before debounce finishes
    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.change(input, { target: { value: '' } });

    // Wait for debounce delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Ensure onSearch is called with the final empty string only
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
