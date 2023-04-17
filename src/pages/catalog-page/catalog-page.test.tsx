import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogPage from './catalog-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
    isReviewsSending: false,
  },
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  }
});

const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CatalogPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
