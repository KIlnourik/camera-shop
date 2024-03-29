import { Camera } from '../../types/camera';
import { getCameraTitle, getPrice } from '../../utils/utils';
import { KeyboardEvent } from 'react';
import Spinner from '../spinner/spinner';
import { RemoveScroll } from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/cart-process/cart-process';

type Props = {
  camera?: Camera;
  handleClosePopup(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
  handleSuccessPopupOpen(): void;
};

function AddItemPopup({ camera, handleClosePopup, handleEscKeydown, handleSuccessPopupOpen }: Props): JSX.Element {


  const dispatch = useAppDispatch();

  const handleAddClickButton = () => {
    if (camera) {
      dispatch(addToCart(camera));
      handleSuccessPopupOpen();
    }
  };

  if (!camera) {
    return <Spinner />;
  }

  return (
    <RemoveScroll>
      <ReactFocusLock>
        <div className="modal is-active" onKeyDown={handleEscKeydown}>
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleClosePopup}></div>
            <div className="modal__content">
              <p className="title title--h4">Добавить товар в корзину</p>
              <div className="basket-item basket-item--short">
                <div className="basket-item__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} />
                    <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
                  </picture>
                </div>
                <div className="basket-item__description">
                  <p className="basket-item__title">{getCameraTitle(camera)}</p>
                  <ul className="basket-item__list">
                    <li className="basket-item__list-item">
                      <span className="basket-item__article">Артикул:</span>
                      <span
                        className="basket-item__number"
                      >{camera.vendorCode}
                      </span>
                    </li>
                    <li className="basket-item__list-item">{camera.type}</li>
                    <li className="basket-item__list-item">{camera.level}</li>
                  </ul>
                  <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{getPrice(camera.price)} ₽</p>
                </div>
              </div>
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
                  onClick={handleAddClickButton}
                >
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>Добавить в корзину
                </button>
              </div>
              <button className="cross-btn" type="button" onClick={handleClosePopup} aria-label="Закрыть попап">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </ReactFocusLock>
    </RemoveScroll>
  );
}

export default AddItemPopup;
