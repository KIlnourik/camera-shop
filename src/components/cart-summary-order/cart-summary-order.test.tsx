import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameraList } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CartSummaryOrder from './cart-summary-order';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  },
  Coupon: {
    discountValue: 25,
    isValidCoupon: true,
    validCoupon: 'coupon'
  }
});


describe('Component: CartSummaryOrder', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CartSummaryOrder
            handleOrderSuccessPopupOpen={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
  });

});
