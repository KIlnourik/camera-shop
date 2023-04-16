import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderSuccessPopup from './order-success-popup';

const history = createMemoryHistory();

describe('Component: OrderSuccessPopup', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history} >
        <OrderSuccessPopup
          handleClosePopup={jest.fn()}
          handleEscKeydown={jest.fn()}
        />
      </HistoryRouter>);

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });

  it('should close popup when user click on Close button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();

    render(
      <HistoryRouter history={history} >
        <OrderSuccessPopup
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
        />
      </HistoryRouter>);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(handleClosePopup).toBeCalled();
  });
});
