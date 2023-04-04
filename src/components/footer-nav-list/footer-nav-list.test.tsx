import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import FooterNavList from './footer-nav-list';

const history = createMemoryHistory();

describe('Component: FooterNavList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <FooterNavList />
      </HistoryRouter>
    );

    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
