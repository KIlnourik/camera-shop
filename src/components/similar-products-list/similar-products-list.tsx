import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/camera-process/selector';
import { MAX_SHOWN_SLIDER_CARDS } from '../../const';
import { Camera } from '../../types/camera';
import CatalogCard from '../catalog-card/catalog-card';

type Props = {
  sliderOffset: number;
  handleBuyButtonClick(camera: Camera): void;

};

function SimilarProductsList({ sliderOffset, handleBuyButtonClick }: Props): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  return (

    <div className="product-similar__slider-list">
      {
        similarCameras.slice(sliderOffset, sliderOffset + MAX_SHOWN_SLIDER_CARDS).map((similarCamera) => (
          <CatalogCard
            camera={similarCamera}
            key={similarCamera.id}
            handleBuyButtonClick={handleBuyButtonClick}
            isActive
          />
        ))
      }
    </div>
  );
}

export default SimilarProductsList;
