import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <NotFoundScreen />
      </HistoryRouter>
    );

    expect(screen.getByText(/Ошибка 404!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к Каталог/i)).toBeInTheDocument();
  })
})
