import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilter
        category={'category'}
        minPrice={'minPrice'}
        maxPrice={'maxPrice'}
        types={['types']}
        levels={['levels']}
        handleCategoryChange={jest.fn()}
        handlePriceChange={jest.fn()}
        handlePriceUpChange={jest.fn()}
        handleTypesChange={jest.fn()}
        handleLevelsChange={jest.fn()}
        handleResetClick={jest.fn()}
      />);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
  });
});
