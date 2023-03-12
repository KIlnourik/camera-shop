import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { getSimilarCamerasLoadingStatus } from '../../store/camera-process/selector';
import { Camera } from '../../types/camera';
import SimilarProductsList from '../similar-products-list/similar-products-list';
import SimilarSliderControls from '../similar-slider-controls/similar-slider-controls';
import Spinner from '../spinner/spinner';

type Props = {
  handleBuyButtonClick(camera: Camera): void;
}

function SimilarProductsSlider({ handleBuyButtonClick }: Props): JSX.Element {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isSimilarCamerasLoading = useAppSelector(getSimilarCamerasLoadingStatus);

  const [sliderOffset, setSliderOffset] = useState(0);
  const handlePrevButtonClick = () => {
    setSliderOffset(sliderOffset - 1);
  };
  const handleNextButtonClick = () => {
    setSliderOffset(sliderOffset + 1);
  };

  useEffect(() => {
    if (id && !isSimilarCamerasLoading) {
      dispatch(fetchSimilarCamerasAction(id));
    } else {
      <NotFoundPage />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  if (isSimilarCamerasLoading) {
    return <Spinner />;
  }

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <SimilarProductsList
            sliderOffset={sliderOffset}
            handleBuyButtonClick={handleBuyButtonClick}
          />

          <SimilarSliderControls
            sliderOffset={sliderOffset}
            handlePrevButtonClick={handlePrevButtonClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        </div>
      </div>
    </section>
  );
}

export default SimilarProductsSlider;
