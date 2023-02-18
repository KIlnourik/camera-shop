import { Camera } from '../../types/camera';
import { getCameraTitle, getPrice } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Rating from '../rating/rating';


type Props = {
  similarCamera: Camera,
}

function SimilarProduct({ similarCamera }: Props): JSX.Element {
  return (
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${similarCamera.previewImgWebp}, /${similarCamera.previewImgWebp2x} 2x`} />
          <img src={`/${similarCamera.previewImg}`} srcSet={`/${similarCamera.previewImg2x} 2x`} width="280" height="240" alt={similarCamera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={similarCamera.rating} />
          <p className="visually-hidden">Рейтинг: {similarCamera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{similarCamera.reviewCount}</p>
        </div>
        <p className="product-card__title">{getCameraTitle(similarCamera)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getPrice(similarCamera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Catalog}/cameras/${similarCamera.id}/${AppRoute.Parameters}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default SimilarProduct;
