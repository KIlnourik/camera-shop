import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCameras, getCamerasLoadingStatus } from '../../store/data-process/selector';
import CatalogCard from '../catalog-card/catalog-card';
import Spinner from '../spinner/spinner';

function CatalogCards(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const isCamerasLoading = useAppSelector(getCamerasLoadingStatus);

  if (isCamerasLoading) {
    return <Spinner />;
  }

  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => (<CatalogCard camera={camera} key={camera.id} />))}
    </div>
  );
}

export default CatalogCards;
