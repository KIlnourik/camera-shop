import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import SimilarProductsSlider from './similar-products-slider';

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  Camera: {
    cameras: [...makeFakeCameraList()],
    allCameras: [...makeFakeCameraList()],
    promo: makeFakePromo(),
    camera: makeFakeCameraInfo(),
    similarCameras: [...makeFakeCameraList()],
    isCamerasLoading: false,
    isPromoLoading: false,
    isCameraLoading: false,
    isSimilarCamerasLoading: false,
  },
  Review: {
    reviews: [...makeFakeReviewList()],
    isReviewsLoading: false,
    isReviewSent: true,
    iseReviewSending: false,
  },
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  }
});

describe('Component: SimilarProductsSlider', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <SimilarProductsSlider
            handleBuyButtonClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
