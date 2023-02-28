import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import ProductParametersTab from './product-parameters-tab';


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

describe('Component: ProductParametersTab', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <ProductParametersTab />
      </Provider>);

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория:/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры:/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/i)).toBeInTheDocument();
  })

})
