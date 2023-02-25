import { Review } from '../../types/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Rating from '../rating/rating';

type Props = {
  review: Review;
};

function ProductReviewCard({ review }: Props): JSX.Element {
  dayjs.locale('ru');
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName} </p>
        <time className="review-card__data" dateTime={review.createAt}>{dayjs(review.createAt).format('DD MMMM')}</time>
      </div>
      <div className="rate review-card__rate">
        <Rating rating={review.rating} />
          <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ProductReviewCard;
