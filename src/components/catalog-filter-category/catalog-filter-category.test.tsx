import { render, screen } from '@testing-library/react';
import CatalogFilterCategory from './catalog-filter-category';


describe('Component: CatalogFilterCategory', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilterCategory
        category={'category'}
        handleCategoryChange={jest.fn()}
      />);

    expect(screen.getByText(/Фотокамера/i)).toBeInTheDocument();
    expect(screen.getByText(/Видеокамера/i)).toBeInTheDocument();
  });
});
