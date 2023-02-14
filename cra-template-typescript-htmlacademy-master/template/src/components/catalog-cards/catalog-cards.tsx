import { useEffect, useState } from 'react';
import { MAX_CARDS_PER_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasLoadingStatus } from '../../store/data-process/selector';
import CatalogCard from '../catalog-card/catalog-card';
import Spinner from '../spinner/spinner';

type Props = {
  offset: number;
};

function CatalogCards({offset}: Props): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const isCamerasLoading = useAppSelector(getCamerasLoadingStatus);
  // console.log(cameras.slice(offset, offset + MAX_CARDS_PER_PAGE));

  if (isCamerasLoading) {
    return <Spinner />;
  }

  return (
    <div className="cards catalog__cards">
      {cameras.slice(offset, offset + MAX_CARDS_PER_PAGE).map((camera) => (<CatalogCard camera={camera} key={camera.id} />))}
    </div>
  );
}

export default CatalogCards;
