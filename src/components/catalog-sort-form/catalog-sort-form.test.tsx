import { render, screen } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';


describe('Component: CatalogSortForm', () => {
  it('should render correctly', () => {
    render(
      <CatalogSortForm
        sort={'sort'}
        order={'order'}
        handleSortChange={jest.fn()}
        handleOrderChange={jest.fn()}
      />);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });
});
