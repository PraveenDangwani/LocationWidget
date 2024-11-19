import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the LocationWidget', () => {
  render(<App />);
  const headingElement = screen.getByText("Locations");
  expect(headingElement).toBeInTheDocument();
});
