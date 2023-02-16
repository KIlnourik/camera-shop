import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../components/product-info/product-info';
import ProductReview from '../components/product-review/product-review';
import SimilarProducts from '../components/similar-products/similar-products';
import Spinner from '../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCameraAction } from '../store/api-actions';
import { getCameraLoadingStatus, getCamera } from '../store/data-process/selector';

function ProductPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const isCameraLoading = useAppSelector(getCameraLoadingStatus);

  useEffect(() => {
    if (id && !isCameraLoading) {
      dispatch(fetchCameraAction(id));
    }
  }, [dispatch, id]);

  if (isCameraLoading) {
    return <Spinner />;
  }

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs isProductPage camera={camera}/>
          <div className="page-content__section">
            <ProductInfo />
          </div>
          <div className="page-content__section">
            <SimilarProducts />
          </div>
          <div className="page-content__section">
            <ProductReview />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>

  );
}

export default ProductPage;
