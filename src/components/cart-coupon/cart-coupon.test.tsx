import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CartCoupon from './cart-coupon';


const mockStore = configureMockStore();
const store = mockStore({
  Coupon: {
    discountValue: undefined,
    isValidCoupon: true,
    validCoupon: undefined,
  },
});
describe('Component: CartCoupon', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <CartCoupon />
      </Provider>);

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
  });
});

