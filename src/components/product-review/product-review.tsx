import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MAX_REVIEWS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviews, getReviewsLoadingStatus } from '../../store/review-process/selector';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';
import Spinner from '../spinner/spinner';

type Props = {
  handleLeaveReviewBtnClick(): void;
}

function ProductReview({ handleLeaveReviewBtnClick }: Props): JSX.Element {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const [reviewOffset, setReviewOffset] = useState(MAX_REVIEWS_COUNT);
  const reviews = useAppSelector(getReviews);
  const handleMoreReviewsButtonClick = () => {
    setReviewOffset(reviewOffset + MAX_REVIEWS_COUNT);
  };

  useEffect(() => {
    if (id && !isReviewsLoading) {
      dispatch(fetchReviewsAction(id));
    } else {
      <NotFoundPage />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  if (isReviewsLoading) {
    return <Spinner />;
  }

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
