import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Layout from './layout';

const history = createMemoryHistory();

describe('Component: Layout', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <Layout/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
  });
});
