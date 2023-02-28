import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddReviewSuccessPopup from './add-review-success-popup';

describe('Component: AddItemPopup', () => {
  it('should render correctly', () => {
    render(
      <AddReviewSuccessPopup
        handleClosePopup={jest.fn()}
        handleEscKeydown={jest.fn()}
      />);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  })

  it('should close popup when user click on Close button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();

    render(
      <AddReviewSuccessPopup
        handleClosePopup={handleClosePopup}
        handleEscKeydown={handleEscKeydown}
      />);

    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(handleClosePopup).toBeCalled();
  })

  it('should close popup when user click on "Вернуться к покупкам" button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();

    render(
      <AddReviewSuccessPopup
        handleClosePopup={handleClosePopup}
        handleEscKeydown={handleEscKeydown}
      />);

    await userEvent.click(screen.getByText('Вернуться к покупкам'));

    expect(handleClosePopup).toBeCalled();
  })
})
