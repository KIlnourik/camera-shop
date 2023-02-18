import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { getSimilarCameras, getSimilarCamerasLoadingStatus } from '../../store/data-process/selector';
import SimilarProductsList from '../similar-products-list/similar-products-list';


function SimilarProducts(): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);
  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasLoadingStatus);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <SimilarProductsList />
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
            disabled>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
