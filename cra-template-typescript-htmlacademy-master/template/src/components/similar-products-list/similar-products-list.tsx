import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/data-process/selector';
import { MAX_SHOWN_SLIDER_CARDS } from '../../const';
import SimilarProduct from '../similar-product/similar-product';

type Props = {
  sliderOffset: number;
};

function SimilarProductsList({sliderOffset}: Props): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  return (

    <div className="product-similar__slider-list">
      {
        similarCameras.slice(sliderOffset, sliderOffset + MAX_SHOWN_SLIDER_CARDS).map((similarCamera) => (
          <SimilarProduct similarCamera={similarCamera} key={similarCamera.id} />
        ))
      }
    </div>
  );
}

export default SimilarProductsList;
