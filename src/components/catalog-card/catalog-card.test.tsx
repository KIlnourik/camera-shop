import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCameraInfo, makeFakeCameraList } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import CatalogCard from './catalog-card';

const mockStore = configureMockStore();
const store = mockStore({
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  }
});

const history = createMemoryHistory();

describe('Component: CatalogCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CatalogCard
            camera={makeFakeCameraInfo()}
            handleBuyButtonClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should open popup when user click on "Купить" button', async () => {
    const camera = makeFakeCameraInfo();
    const handleBuyButtonClick = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CatalogCard
            camera={camera}
            handleBuyButtonClick={handleBuyButtonClick}
          />
        </HistoryRouter>
      </Provider>
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByText('Купить'));

    expect(handleBuyButtonClick).toBeCalled();
  });

});
