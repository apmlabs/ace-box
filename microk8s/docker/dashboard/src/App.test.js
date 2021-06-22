import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dynatrace somewhere', () => {
  render(<App />);
  const linkElement = screen.getByText(/dynatrace/i);
  expect(linkElement).toBeInTheDocument();
});
