import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCameraInfo } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import SimilarProduct from './similar-product';

const history = createMemoryHistory();

describe('Component: SimilarProduct', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <SimilarProduct
          similarCamera={makeFakeCameraInfo()}
          handleBuyButtonClick={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  })

  it('should open popup when user click on "Купить" button', async () => {
    const camera = makeFakeCameraInfo();
    const handleBuyButtonClick = jest.fn();
    render(
      <HistoryRouter history={history} >
        <SimilarProduct
          similarCamera={camera}
          handleBuyButtonClick={handleBuyButtonClick} />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Купить'));

    expect(handleBuyButtonClick).toBeCalled();
  })

});
