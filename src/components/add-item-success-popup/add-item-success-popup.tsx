import { KeyboardEvent } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type Props = {
  handleClosePopup(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
}

function AddItemSuccessPopup({ handleClosePopup, handleEscKeydown }: Props): JSX.Element {

  return (
    <RemoveScroll>
      <ReactFocusLock>
        <div className="modal is-active modal--narrow" onKeyDown={handleEscKeydown}>
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleClosePopup}></div>
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                <button className="btn btn--transparent modal__btn"
                  onClick={handleClosePopup}
                >Продолжить покупки
                </button>
                <Link className="btn btn--purple modal__btn modal__btn--fit-width"
                  to={AppRoute.Cart}
                >
                  Перейти в корзину
                </Link>
              </div>
              <button className="cross-btn"
                type="button"
                onClick={handleClosePopup}
                aria-label="Закрыть попап"
              >
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

export default AddItemSuccessPopup;
