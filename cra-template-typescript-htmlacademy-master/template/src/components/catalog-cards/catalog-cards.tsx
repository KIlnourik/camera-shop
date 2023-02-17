import { MAX_CARDS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCameras, getCamerasLoadingStatus } from '../../store/data-process/selector';
import { Camera } from '../../types/camera';
import CatalogCard from '../catalog-card/catalog-card';
import Spinner from '../spinner/spinner';

type Props = {
  offset: number;
  handleBuyButtonClick(camera: Camera | undefined): void;
};

function CatalogCards({offset, handleBuyButtonClick}: Props): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const isCamerasLoading = useAppSelector(getCamerasLoadingStatus);

  if (isCamerasLoading) {
    return <Spinner />;
  }

  return (
    <div className="cards catalog__cards">
      {cameras.slice(offset, offset + MAX_CARDS_PER_PAGE).map((camera) => (<CatalogCard camera={camera} key={camera.id} handleBuyButtonClick={handleBuyButtonClick}/>))}
    </div>
  );
}

export default CatalogCards;
