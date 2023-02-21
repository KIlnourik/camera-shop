import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCameraAction, fetchSimilarCamerasAction } from '../store/api-actions';
import { getCameraLoadingStatus, getCamera, getSimilarCameras, getSimilarCamerasLoadingStatus } from '../store/data-process/selector';
import { Camera } from '../types/camera';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../components/product-info/product-info';
import ProductReview from '../components/product-review/product-review';
import SimilarProductsSlider from '../components/similar-products-slider/similar-products-slider';
import Spinner from '../components/spinner/spinner';
import AddItemPopup from '../components/add-item-popup/add-item-popup';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const [chosenCamera, setChosenCamera] = useState<Camera | undefined>(undefined);
  const isCameraLoading = useAppSelector(getCameraLoadingStatus);
  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasLoadingStatus);
  const [isActivePopup, setActivePopup] = useState(false);

  const handleBuyButtonClick = (camera: Camera) => {
    setActivePopup(!isActivePopup);
    setChosenCamera(camera);
  }

  const handleCloseButtonPopup = () => {
    setActivePopup(!isActivePopup);
  }

  useEffect(() => {
    if (id && !isCameraLoading && !isSimilarCamerasLoading) {
      dispatch(fetchCameraAction(id));
      dispatch(fetchSimilarCamerasAction(id));
    }
  }, [dispatch, id]);

  if (isCameraLoading || isSimilarCamerasLoading || !camera) {
    return <Spinner />;
  }

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs isProductPage camera={camera} />
          <div className="page-content__section">
            <ProductInfo handleBuyButtonClick={handleBuyButtonClick}/>
          </div>
          <div className="page-content__section">
            <SimilarProductsSlider handleBuyButtonClick={handleBuyButtonClick}/>
          </div>
          <div className="page-content__section">
            <ProductReview />
          </div>
        </div>
        {isActivePopup && <AddItemPopup camera={chosenCamera} handleCloseButtonPopup={handleCloseButtonPopup} />}
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
