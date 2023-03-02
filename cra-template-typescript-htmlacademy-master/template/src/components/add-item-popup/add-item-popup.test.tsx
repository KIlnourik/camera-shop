import { render, screen } from '@testing-library/react';
import { makeFakeCameraInfo } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import AddItemPopup from './add-item-popup';

const mockCamera = makeFakeCameraInfo();

describe('Component: AddItemPopup', () => {
  it('should render correctly', () => {
    render(
      <AddItemPopup
        camera={mockCamera}
        handleClosePopup={jest.fn()}
        handleEscKeydown={jest.fn()}
      />);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });

  it('should close popup when user click on Close button', async () => {
    const handleClosePopup = jest.fn();
    const handleEscKeydown = jest.fn();

    render(
      <AddItemPopup
        camera={mockCamera}
        handleClosePopup={handleClosePopup}
        handleEscKeydown={handleEscKeydown}
      />);

    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(handleClosePopup).toBeCalled();
  });
});
