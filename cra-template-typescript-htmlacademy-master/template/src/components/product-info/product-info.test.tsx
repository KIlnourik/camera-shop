import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import ProductInfo from './product-info';

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  Data: {
    cameras: [...makeFakeCameraList()],
    promo: makeFakePromo(),
    camera: makeFakeCameraInfo(),
    similarCameras: [...makeFakeCameraList()],
    reviews: [...makeFakeReviewList()],
    isCamerasLoading: false,
    isPromoLoading: false,
    isCameraLoading: false,
    isSimilarCamerasLoading: false,
    isReviewsLoading: false,
    isReviewSent: true,
  }
});

describe('Component: ProductInfo', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <ProductInfo
            handleBuyButtonClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should close popup when user click on "Добавить в корзину" button', async () => {
    const handleBuyButtonClick = jest.fn();

    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <ProductInfo
            handleBuyButtonClick={handleBuyButtonClick}
          />
        </HistoryRouter>
      </Provider >);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByTestId('add-to-cart'));

    expect(handleBuyButtonClick).toBeCalled();
  });

});
