import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import NavList from './nav-list';

const history = createMemoryHistory();

describe('Component: NavList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <NavList />
      </HistoryRouter>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
