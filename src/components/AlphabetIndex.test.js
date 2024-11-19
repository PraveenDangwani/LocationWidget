import { render, screen, fireEvent } from '@testing-library/react';
import AlphabetIndex from './AlphabetIndex';

describe('AlphabetIndex Component', () => {
  const mockScrollToLetter = jest.fn();

  it('renders all letters passed as props', () => {
    const letters = ['A', 'B', 'C'];
    render(<AlphabetIndex letters={letters} scrollToLetter={mockScrollToLetter} />);

    letters.forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it('calls scrollToLetter when a letter is clicked', () => {
    const letters = ['A', 'B'];
    render(<AlphabetIndex letters={letters} scrollToLetter={mockScrollToLetter} />);
    
    fireEvent.click(screen.getByText('A'));
    expect(mockScrollToLetter).toHaveBeenCalledWith('A');
  });
});
