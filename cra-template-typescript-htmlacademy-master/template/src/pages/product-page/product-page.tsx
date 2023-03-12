import { useEffect, useState, KeyboardEvent } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CAMERAS_URL, Popup } from '../../const';
import {
  fetchCameraAction
} from '../../store/api-actions';
import {
  getCameraLoadingStatus,
  getCamera,
} from '../../store/camera-process/selector';
import { Camera } from '../../types/camera';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../../components/product-info/product-info';
import ProductReview from '../../components/product-review/product-review';
import SimilarProductsSlider from '../../components/similar-products-slider/similar-products-slider';
import Spinner from '../../components/spinner/spinner';
import AddItemPopup from '../../components/add-item-popup/add-item-popup';
import AddReviewPopup from '../../components/add-review-popup/add-review-popup';
import AddReviewSuccessPopup from '../../components/add-review-success-popup/add-review-success-popup';
import NotFoundPage from '../not-found-page/not-found-page';

function ProductPage(): JSX.Element {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const [camerasUrl,] = useState(location.pathname.split('/')[1]);
  const [chosenCamera, setChosenCamera] = useState<Camera | undefined>(undefined);
  const [activePopup, setActivePopup] = useState<string | undefined>(undefined);
  const isCameraLoading = useAppSelector(getCameraLoadingStatus);

  const handleBuyButtonClick = (selectedCamera: Camera) => {
    setActivePopup(Popup.BasketPopup);
    setChosenCamera(selectedCamera);
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

  const handleSuccessClosePopup = () => {
    if (id) {
      setActivePopup(undefined);
    }
  };

  useEffect(() => {
    if (id && !isCameraLoading) {
      dispatch(fetchCameraAction(id));
    } else {
      <NotFoundPage />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  if (isCameraLoading) {
    return <Spinner />;
  }

  if (!id || !camera || (camerasUrl !== CAMERAS_URL)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <main>
        <div className="page-content" onKeyDown={handleEscKeydown} data-testid="page-content">
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
            handleEscKeydown={handleEscKeydown}
          />}
        {activePopup === Popup.ReviewPopup &&
          <AddReviewPopup
            handleClosePopup={handleClosePopup}
            handleSuccessPopupOpen={handleSuccessPopupOpen}
            handleEscKeydown={handleEscKeydown}
          />}
        {activePopup === Popup.ReviewSuccessPopup &&
          <AddReviewSuccessPopup
            handleClosePopup={handleSuccessClosePopup}
            handleEscKeydown={handleEscKeydown}
          />}
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
