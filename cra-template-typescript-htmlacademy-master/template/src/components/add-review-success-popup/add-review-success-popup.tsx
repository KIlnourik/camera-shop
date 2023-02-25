import { KeyboardEvent } from 'react';
import ReactFocusLock from 'react-focus-lock';

type Props = {
  handleClosePopup(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
}

function AddReviewSuccessPopup({ handleClosePopup, handleEscKeydown }: Props): JSX.Element {
  return (
    <ReactFocusLock >
      <div className="modal is-active modal--narrow" onKeyDown={handleEscKeydown}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleClosePopup}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleClosePopup}>Вернуться к покупкам
              </button>
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
  );
}

export default AddReviewSuccessPopup;
