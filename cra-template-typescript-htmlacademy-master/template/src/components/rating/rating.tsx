import { MAX_RATING_COUNT } from '../../const';

type Props = {
  rating: number;
};

function Rating({ rating }: Props): JSX.Element {

  return (
    <>
      {new Array(rating).fill(null).map(() => (
        <svg width="17" height="16" aria-hidden="true" key={Math.random()}>
          <use xlinkHref="#icon-full-star"></use>
        </svg>))
        .concat(
          new Array(MAX_RATING_COUNT - rating).fill(null).map(() => (
            <svg width="17" height="16" aria-hidden="true" key={Math.random()}>
              <use xlinkHref="#icon-star"></use>
            </svg>))
        )}
    </>

  );
}

export default Rating;
