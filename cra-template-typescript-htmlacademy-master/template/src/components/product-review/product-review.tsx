import { useState } from 'react';
import { MAX_REVIEWS_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/review-process/selector';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';

type Props = {
  handleLeaveReviewBtnClick(): void;
}

function ProductReview({ handleLeaveReviewBtnClick }: Props): JSX.Element {

  const [reviewOffset, setReviewOffset] = useState(MAX_REVIEWS_COUNT);
  const reviews = useAppSelector(getReviews);
  const handleMoreReviewsButtonClick = () => {
    setReviewOffset(reviewOffset + MAX_REVIEWS_COUNT);
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={handleLeaveReviewBtnClick}>Оставить свой отзыв</button>
        </div>
        <ProductReviewsList reviewOffset={reviewOffset} />
        <div className="review-block__buttons">
          {(reviewOffset < reviews.length) &&
            <button className="btn btn--purple" type="button" onClick={handleMoreReviewsButtonClick}>
              Показать больше отзывов
            </button>}
        </div>
      </div>
    </section>
  );
}

export default ProductReview;
