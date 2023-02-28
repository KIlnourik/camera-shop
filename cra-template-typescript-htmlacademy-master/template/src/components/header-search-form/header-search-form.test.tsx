import { render, screen } from '@testing-library/react';
import HeaderSearchForm from './header-search-form';

describe('Component: HeaderSearchForm', () => {
  it('should render correctly', () => {
    render(<HeaderSearchForm/>);

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    expect(screen.getByText(/Cannonball Pro MX 6i/i)).toBeInTheDocument();
  })
})
