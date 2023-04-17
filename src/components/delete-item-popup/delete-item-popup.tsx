import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { useAppDispatch } from '../../hooks';
import { removeProduct } from '../../store/cart-process/cart-process';
import { KeyboardEvent } from 'react';
import Spinner from '../spinner/spinner';
import { getCameraTitle } from '../../utils/utils';
import { Filters } from '../../const';
import { RemoveScroll } from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock';

type Props = {
  cartProduct?: Camera;
  handleClosePopup(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
}

function DeleteItemPopup({ cartProduct, handleClosePopup, handleEscKeydown }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = (product: Camera) => {
    if (cartProduct) {
      dispatch(removeProduct(cartProduct));
      handleClosePopup();
    }
  };

  if (!cartProduct) {
    return <Spinner />;
  }

  return (
    <RemoveScroll>
      <ReactFocusLock>
        <div className="modal is-active" onKeyDown={handleEscKeydown}>
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleClosePopup}></div>
            <div className="modal__content">
              <p className="title title--h4">Удалить этот товар?</p>
              <div className="basket-item basket-item--short">
                <div className="basket-item__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${cartProduct.previewImgWebp}, /${cartProduct.previewImgWebp2x} 2x`} />
                    <img src={`/${cartProduct.previewImg}`} srcSet={`/${cartProduct.previewImg2x} 2x`} width="280" height="240" alt={cartProduct.name} />
                  </picture>
                </div>
                <div className="basket-item__description">
                  <p className="basket-item__title">{getCameraTitle(cartProduct)}</p>
                  <ul className="basket-item__list">
                    <li className="basket-item__list-item">
                      <span className="basket-item__article">Артикул: </span>
                      <span className="basket-item__number">{cartProduct.vendorCode}</span>
                    </li>
                    <li className="basket-item__list-item">{`${cartProduct.type} ${cartProduct.category === Filters.videocamera ? 'видеокамера' : 'фотокамера'}`}</li>
                    <li className="basket-item__list-item">{cartProduct.level} уровень</li>
                  </ul>
                </div>
              </div>
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--half-width"
                  type="button"
                  onClick={() => handleDeleteButtonClick(cartProduct)}
                >
                  Удалить
                </button>
                <Link className="btn btn--transparent modal__btn modal__btn--half-width" to='' onClick={handleClosePopup}>
                  Продолжить покупки
                </Link>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleClosePopup}>
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

export default DeleteItemPopup;
