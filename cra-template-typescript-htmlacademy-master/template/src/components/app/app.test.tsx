import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import {
  makeFakeCameraInfo,
  makeFakeCameraList,
  makeFakePromo,
  makeFakeReviewList,
} from '../../utils/mocks';
import App from './app';

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

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history} >
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

});

