import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import SimilarSliderControls from './similar-slider-controls';

const history = createMemoryHistory();

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

describe('Component: SimilarSliderControls', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <SimilarSliderControls
            sliderOffset={3}
            handlePrevButtonClick={jest.fn()}
            handleNextButtonClick={jest.fn()}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByLabelText('Предыдущий слайд')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующий слайд')).toBeInTheDocument();
  });

  it('should switch sliders when user click on "Предыдущий слайд" button', async () => {
    const handlePrevButtonClick = jest.fn();
    const handleNextButtonClick = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <SimilarSliderControls
            sliderOffset={3}
            handlePrevButtonClick={handlePrevButtonClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        </HistoryRouter>
      </Provider>);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Предыдущий слайд'));

    expect(handlePrevButtonClick).toBeCalled();
  });

  it('should switch sliders when user click on "Следующий слайд" button', async () => {
    const handlePrevButtonClick = jest.fn();
    const handleNextButtonClick = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <SimilarSliderControls
            sliderOffset={3}
            handlePrevButtonClick={handlePrevButtonClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        </HistoryRouter>
      </Provider>);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Следующий слайд'));

    expect(handleNextButtonClick).toBeCalled();
  });
});
