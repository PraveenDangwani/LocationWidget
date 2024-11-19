import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the LocationWidget', () => {
  render(<App />);
  // Check if the heading "Locations" is rendered
  const headingElement = screen.getByText("Locations");
  expect(headingElement).toBeInTheDocument();
});
