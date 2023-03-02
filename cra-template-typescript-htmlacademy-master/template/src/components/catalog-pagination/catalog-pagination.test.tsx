import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameraInfo, makeFakeCameraList, makeFakePromo, makeFakeReviewList } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CatalogPagination from './catalog-pagination';

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

const history = createMemoryHistory();

describe('Component: CatalogPagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CatalogPagination
            handlePageButtonClick={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handleNextButtonClick={jest.fn()}
            chosenPage={8}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should change to next page when user click on next page button', async () => {
    const handlePageButtonClick = jest.fn();
    const handleBackButtonClick = jest.fn();
    const handleNextButtonClick = jest.fn();

    render(
      <Provider store={store} >
        <HistoryRouter history={history} >
          <CatalogPagination
            handlePageButtonClick={handlePageButtonClick}
            handleBackButtonClick={handleBackButtonClick}
            handleNextButtonClick={handleNextButtonClick}
            chosenPage={8}
          />
        </HistoryRouter>
      </Provider>);

    await userEvent.click(screen.getByText('Далее'));

    expect(handleNextButtonClick).toBeCalled();
  });
});
