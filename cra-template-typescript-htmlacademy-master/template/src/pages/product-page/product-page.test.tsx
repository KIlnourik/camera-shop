import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import ProductPage from './product-page';
import { Provider } from 'react-redux';

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
  })

});