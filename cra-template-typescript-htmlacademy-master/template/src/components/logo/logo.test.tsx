import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(<Logo />);

    expect(screen.getByLabelText(/Переход на главную/i)).toBeInTheDocument();
  })
})
