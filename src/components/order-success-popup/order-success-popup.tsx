import { RemoveScroll } from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { KeyboardEvent } from 'react';

type Props = {
  handleClosePopup(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
};

function OrderSuccessPopup({ handleClosePopup, handleEscKeydown }: Props): JSX.Element {
  return (
    <RemoveScroll>
      <ReactFocusLock>
        <div className="modal is-active modal--narrow" onKeyDown={handleEscKeydown}>
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleClosePopup}></div>
            <div className="modal__content">
              <p className="title title--h4">Спасибо за покупку</p>
              <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                <use xlinkHref="#icon-review-success"></use>
              </svg>
              <div className="modal__buttons">
                <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={AppRoute.Catalog} onClick={handleClosePopup}>Вернуться к покупкам
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

export default OrderSuccessPopup;
