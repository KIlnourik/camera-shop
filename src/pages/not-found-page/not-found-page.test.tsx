import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <NotFoundPage />
      </HistoryRouter>
    );

    expect(screen.getByText(/Ошибка 404!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к Каталог/i)).toBeInTheDocument();
  });
});
