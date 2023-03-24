import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

const filters = {
  categoryQuery: 'categoryQuery',
  typeQuery: 'typeQuery',
  levelQuery: 'levelQuery',
};

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(<CatalogFilter categoryQuery={filters.categoryQuery} typeQuery={filters.typeQuery} levelQuery={filters.levelQuery} setSearchParams={jest.fn()}/>);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
  });
});
