import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import CatalogRating from '../catalog-rating/catalog-rating';
import { getCameraTitle, getPrice } from '../../utils/utils';

type Props = {
  camera: Camera,
  handleBuyButtonClick(camera: Camera): void;
}

function CatalogCard({ camera, handleBuyButtonClick }: Props): JSX.Element {

  return (
    <div className="product-card" >
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <CatalogRating rating={camera.rating} />
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{getCameraTitle(camera)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleBuyButtonClick(camera)}>Купить
        </button>
        <Link className="btn btn--transparent" to={`/cameras/${camera.id}`}>Подробнее
        </Link>
      </div>
    </div >

  );
}

export default CatalogCard;
