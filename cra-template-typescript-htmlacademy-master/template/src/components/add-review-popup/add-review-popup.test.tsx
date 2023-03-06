import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import AddReviewPopup from './add-review-popup';


const mockStore = configureMockStore();
const store = mockStore({
  Camera: {
    cameras: [...makeFakeCameraList()],
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
  }
});
describe('Component: AddReviewPopup', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <AddReviewPopup
          handleClosePopup={jest.fn()}
          handleSuccessPopupOpen={jest.fn()}
          handleEscKeydown={jest.fn()}
        />
      </Provider>);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('should close popup when user click on Close button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();
    const handleSuccessPopupOpen = jest.fn();

    render(
      <Provider store={store} >
        <AddReviewPopup
          handleClosePopup={handleClosePopup}
          handleSuccessPopupOpen={handleSuccessPopupOpen}
          handleEscKeydown={handleEscKeydown}
        />
      </Provider>);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(handleClosePopup).toBeCalled();
  });

  it('should render popup', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();
    const handleSuccessPopupOpen = jest.fn();
    render(
      <Provider store={store} >
        <AddReviewPopup
          handleClosePopup={handleClosePopup}
          handleSuccessPopupOpen={handleSuccessPopupOpen}
          handleEscKeydown={handleEscKeydown}
        />
      </Provider>);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.type(screen.getByTestId('userName'), 'name');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.type(screen.getByTestId('advantage'), 'good');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.type(screen.getByTestId('disadvantage'), 'bad');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.type(screen.getByTestId('review'), 'something');

    expect(screen.getByDisplayValue(/name/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/good/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/bad/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/something/i)).toBeInTheDocument();
  });
});
