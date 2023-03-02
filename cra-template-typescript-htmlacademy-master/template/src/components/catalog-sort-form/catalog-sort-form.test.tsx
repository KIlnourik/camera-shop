import { render, screen } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';

describe('Component: CatalogSortForm', () => {
  it('should render correctly', () => {
    render(<CatalogSortForm/>);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });
});
