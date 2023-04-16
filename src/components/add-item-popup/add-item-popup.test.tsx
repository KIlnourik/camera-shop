import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItemPopup from './add-item-popup';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';

const mockCamera = makeFakeCameraInfo();


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
    isReviewsSending: false,
  },
  Cart: {
    cartProducts: [...makeFakeCameraList()],
  }
});

describe('Component: AddItemPopup', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <AddItemPopup
          camera={mockCamera}
          handleClosePopup={jest.fn()}
          handleEscKeydown={jest.fn()}
          handleSuccessPopupOpen={jest.fn()}
        />
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });

  it('should close popup when user click on Close button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();
    const handleSuccessPopupOpen = jest.fn();

    render(
      <Provider store={store}>
        <AddItemPopup
          camera={mockCamera}
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
          handleSuccessPopupOpen={handleSuccessPopupOpen}
        />
      </Provider>
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(handleClosePopup).toBeCalled();
  });
});
