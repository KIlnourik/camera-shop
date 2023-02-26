import { useEffect, useState, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Popup } from '../../const';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import {
  getCameraLoadingStatus,
  getCamera,
  getSimilarCamerasLoadingStatus,
  getReviewsLoadingStatus,
  getReviewSendingStatus
} from '../../store/data-process/selector';
import { Camera } from '../../types/camera';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../../components/product-info/product-info';
import ProductReview from '../../components/product-review/product-review';
import SimilarProductsSlider from '../../components/similar-products-slider/similar-products-slider';
import Spinner from '../../components/spinner/spinner';
import AddItemPopup from '../../components/add-item-popup/add-item-popup';
import AddReviewPopup from '../../components/add-review-popup/add-review-popup';
import AddReviewSuccessPopup from '../../components/add-review-success-popup/add-review-success-popup';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const [chosenCamera, setChosenCamera] = useState<Camera | undefined>(undefined);
  const [activePopup, setActivePopup] = useState<string | undefined>(undefined);
  const isCameraLoading = useAppSelector(getCameraLoadingStatus);
  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasLoadingStatus);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const isReviewSent = useAppSelector(getReviewSendingStatus);

  const handleBuyButtonClick = (camera: Camera) => {
    setActivePopup(Popup.BasketPopup);
    setChosenCamera(camera);
  };

  const handleLeaveReviewBtnClick = () => {
    setActivePopup(Popup.ReviewPopup);
  };

  const handleEscKeydown = (evt: KeyboardEvent<HTMLElement>) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setActivePopup(undefined);
    }
  };

  const handleClosePopup = () => {
    setActivePopup(undefined);
  };

  const handleSuccessPopupOpen = () => {
      setActivePopup(Popup.ReviewSuccessPopup);
  };

  useEffect(() => {
    if (id && !isCameraLoading && !isSimilarCamerasLoading && !isReviewsLoading) {
      dispatch(fetchCameraAction(id));
      dispatch(fetchSimilarCamerasAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (isCameraLoading || isSimilarCamerasLoading || isReviewsLoading || !camera) {
    return <Spinner />;
  }

  if (!id) {
    return <NotFoundScreen />
  };

  return (
    <>
      <main>
        <div className="page-content" onKeyDown={handleEscKeydown}>
          <Breadcrumbs isProductPage camera={camera} />
          <div className="page-content__section">
            <ProductInfo handleBuyButtonClick={handleBuyButtonClick} />
          </div>
          <div className="page-content__section">
            <SimilarProductsSlider handleBuyButtonClick={handleBuyButtonClick} />
          </div>
          <div className="page-content__section">
            <ProductReview handleLeaveReviewBtnClick={handleLeaveReviewBtnClick} />
          </div>
        </div>
        {activePopup === Popup.BasketPopup &&
          <AddItemPopup
            camera={chosenCamera}
            handleClosePopup={handleClosePopup}
            handleEscKeydown={handleEscKeydown} />}
        {activePopup === Popup.ReviewPopup &&
          <AddReviewPopup
            handleClosePopup={handleClosePopup}
            handleSuccessPopupOpen={handleSuccessPopupOpen}
            handleEscKeydown={handleEscKeydown} />}
        {activePopup === Popup.ReviewSuccessPopup &&
          <AddReviewSuccessPopup
            handleClosePopup={handleClosePopup}
            handleEscKeydown={handleEscKeydown} />}
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