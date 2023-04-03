import { render, screen } from '@testing-library/react';
import CatalogFilterType from './catalog-filter-type';


describe('Component: CatalogFilterType', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilterType
        types={['types']}
        category={'category'}
        handleTypesChange={jest.fn()}
      />);

    expect(screen.getByText(/Цифровая/i)).toBeInTheDocument();
    expect(screen.getByText(/Плёночная/i)).toBeInTheDocument();
    expect(screen.getByText(/Моментальная/i)).toBeInTheDocument();
    expect(screen.getByText(/Коллекционная/i)).toBeInTheDocument();
  });
});
