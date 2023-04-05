import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCameraInfo } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: CatalogCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <Breadcrumbs
          isProductPage
          camera={makeFakeCameraInfo()}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
