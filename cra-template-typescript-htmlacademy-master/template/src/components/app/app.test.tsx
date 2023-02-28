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
  makeFakeUserReview,
} from '../../utils/mocks';
import App from './app';

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
    <App />
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/catalog"', () => {

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" and tab "Parameters" when user navigate to "/cameras/:id/parameters"', () => {

    render(fakeApp);

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория:/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры:/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/i)).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {

    render(fakeApp);

    expect(screen.getByText(/Ошибка 404! Такой страницы не существует.Что ж.../i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к Каталог/i)).toBeInTheDocument();
  });
});

