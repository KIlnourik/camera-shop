import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import ProductPage from './product-page';
import { Provider } from 'react-redux';

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
    isReviewsSending: false
  }
});

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <ProductPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

});
