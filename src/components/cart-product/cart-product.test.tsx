import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameraInfo, makeFakeCameraList } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import CartProduct from './cart-product';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  }
});


describe('Component: CartProduct', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CartProduct
            cartProduct={makeFakeCameraInfo()}
            handleDeleteButtonClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
  });

  it('should open popup when user click on "Delete" button', async () => {
    const cartProduct = makeFakeCameraInfo();
    const handleDeleteButtonClick = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CartProduct
            cartProduct={cartProduct}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        </HistoryRouter>
      </Provider>
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Удалить товар'));

    expect(handleDeleteButtonClick).toBeCalled();
  });

});
