import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import SocialList from './social-list';

const history = createMemoryHistory();

describe('Component: SocialList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <SocialList />
      </HistoryRouter>
    );

    expect(screen.getByLabelText('Переход на страницу вконтакте')).toBeInTheDocument();
    expect(screen.getByLabelText('Переход на страницу pinterest')).toBeInTheDocument();
    expect(screen.getByLabelText('Переход на страницу reddit')).toBeInTheDocument();
  })
})
