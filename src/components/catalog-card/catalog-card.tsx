import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { getCameraTitle, getPrice } from '../../utils/utils';
import { AppRoute } from '../../const';
import Rating from '../rating/rating';
import { useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import { useEffect, useState } from 'react';

type Props = {
  camera: Camera;
  handleBuyButtonClick(camera: Camera): void;
  isSimilar?: boolean;
}

function CatalogCard({ camera, handleBuyButtonClick, isSimilar }: Props): JSX.Element {

  const [isInCart, setIsInCart] = useState(false);
  const cartProducts = useAppSelector(getCartProducts);

  useEffect(() => {
    cartProducts.forEach((product) => {
      if (product.id === camera.id) {
        setIsInCart(true);
      }
    });
  }, [camera.id, cartProducts]);

  return (
    <div className={`product-card  ${isSimilar ? 'is-active' : ''}`} >
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {camera.rating && <Rating rating={camera.rating} />}
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{getCameraTitle(camera)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInCart ?
          <button className="btn btn--purple-border">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </button>
          :
          <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleBuyButtonClick(camera)}>
            Купить
          </button>}


        <Link className="btn btn--transparent" to={`/cameras/${camera.id}/${AppRoute.Parameters}`}>Подробнее
        </Link>
      </div>
    </div >

  );
}

export default CatalogCard;
