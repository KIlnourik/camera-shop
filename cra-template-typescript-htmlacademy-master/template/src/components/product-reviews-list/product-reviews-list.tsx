import { useAppSelector } from '../../hooks';
import { getReviews, getReviewsLoadingStatus } from '../../store/data-process/selector';
import { MAX_REVIEWS_COUNT } from '../../const';
import dayjs from 'dayjs';
import ProductReviewCard from '../product-review-card/product-review-card';
import { Review } from '../../types/review';

type Props = {
  reviewOffset: number;
};

const getWeightForNullDate = (dateA: string, dateB: string) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (reviewA: Review, reviewB: Review) => {
  return getWeightForNullDate(reviewA.createAt, reviewB.createAt)
    ?? dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
};

function ProductReviewsList({ reviewOffset }: Props): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const sortedReviews = [...reviews].sort(sortByDate);

  return (
    <ul className="review-block__list" data-testid="review-list">
      {sortedReviews.slice(0, reviewOffset).map((review) => (
        <ProductReviewCard review={review} key={review.id} />
      ))}
    </ul>
  );
}

export default ProductReviewsList;
