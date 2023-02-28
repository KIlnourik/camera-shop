import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import Banner from './banner';

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


describe('Component: AddItemPopup', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <Banner />
      </Provider>);

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  })
});
