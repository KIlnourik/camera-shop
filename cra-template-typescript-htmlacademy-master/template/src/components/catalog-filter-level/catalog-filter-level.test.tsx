import { render, screen } from '@testing-library/react';
import CatalogFilterLevel from './catalog-filter-level';


describe('Component: CatalogFilterLevel', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilterLevel
        levels={['levels']}
        handleLevelsChange={jest.fn()}
      />);

    expect(screen.getByText(/Нулевой/i)).toBeInTheDocument();
    expect(screen.getByText(/Любительский/i)).toBeInTheDocument();
    expect(screen.getByText(/Профессиональный/i)).toBeInTheDocument();
  });
});
