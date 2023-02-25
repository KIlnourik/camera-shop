import { SubmitHandler, useForm } from 'react-hook-form';
import { getRatingValues } from '../../utils/utils';
import { MAX_RATING_COUNT, RatingValues } from '../../const';
import { ReviewPost } from '../../types/review-post';
import { Fragment, SyntheticEvent, useState, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import ReactFocusLock from 'react-focus-lock';

type Props = {
  handleClosePopup(): void;
  handleSuccessPopupOpen(): void;
  handleEscKeydown(evt: KeyboardEvent): void;
}

function AddReviewPopup({ handleClosePopup, handleSuccessPopupOpen, handleEscKeydown }: Props): JSX.Element {
  const ratingList = getRatingValues(MAX_RATING_COUNT);
  const dispatch = useAppDispatch();
  const [adoptedRating, setAdoptedRating] = useState(0);
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewPost>();

  const handleRatingChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (value) {
      setAdoptedRating(parseInt(value, 10));
    } else {
      setAdoptedRating(adoptedRating);
    }
  }

  const onSubmit: SubmitHandler<ReviewPost> = data => {
    dispatch(sendReviewAction({ ...data, rating: adoptedRating, cameraId: Number(id) }));
    handleClosePopup();
    handleSuccessPopupOpen();
  };

  return (
    <ReactFocusLock >
      <div className="modal is-active" onKeyDown={handleEscKeydown}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleClosePopup}></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-review__rate">
                  <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {
                          ratingList.map((ratingValue) => (
                            <Fragment key={ratingValue}>
                              <input className="visually-hidden"
                                id={`star-${ratingValue}`}
                                type="radio"
                                value={ratingValue}
                                {...register('rating', {
                                  required: 'Нужно оценить товар',
                                  onChange: handleRatingChange,
                                })}
                              />
                              <label className="rate__label"
                                htmlFor={`star-${ratingValue}`}
                                title={Object.hasOwn(RatingValues, ratingValue) ? RatingValues[ratingValue] : ''}></label>
                            </Fragment>
                          ))
                        }
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">0</span>
                        <span>/</span>
                        <span className="rate__all-stars">{MAX_RATING_COUNT}</span>
                      </div>
                    </div>
                    {errors.rating && <p className="rate__message">{errors.rating?.message}</p>}
                  </fieldset>
                  <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                    <label><span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg></span>
                      <input type="text"
                        {...register('userName', {
                          required: 'Нужно указать имя',
                          minLength: {
                            value: 1,
                            message: 'Минимум 1 символ',
                          },
                        })}
                        placeholder="Введите ваше имя" />
                    </label>
                    {errors.userName && <p className="custom-input__error">{errors.userName.message}</p>}
                  </div>
                  <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                    <label><span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg></span>
                      <input type="text"
                        placeholder="Основные преимущества товара"
                        {...register('advantage', {
                          required: 'Нужно указать достоинства',
                          minLength: {
                            value: 1,
                            message: 'Минимум 1 символ',
                          },
                        })}
                      />
                    </label>
                    {errors.advantage && <p className="custom-input__error">{errors.advantage.message}</p>}
                  </div>
                  <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                    <label><span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg></span>
                      <input type="text"
                        placeholder="Главные недостатки товара"
                        {...register('disadvantage', {
                          required: 'Нужно указать недостатки',
                          minLength: {
                            value: 1,
                            message: 'Минимум 1 символ',
                          },
                        })} />
                    </label>
                    {errors.disadvantage && <p className="custom-input__error">{errors.disadvantage.message}</p>}
                  </div>
                  <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                    <label><span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg></span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        {...register('review', {
                          required: 'Нужно добавить комментарий',
                          minLength: {
                            value: 5,
                            message: 'Минимум 5 символов',
                          },
                        })}></textarea>
                    </label>
                    {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleClosePopup}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div >
      </div >

    </ReactFocusLock>
  );
}

export default AddReviewPopup;
