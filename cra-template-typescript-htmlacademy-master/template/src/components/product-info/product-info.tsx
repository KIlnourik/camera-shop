import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/camera-process/selector';
import { Camera } from '../../types/camera';
import { getPrice, getCameraTitle } from '../../utils/utils';
import ProductTabs from '../product-tabs/product-tabs';
import Rating from '../rating/rating';
import Spinner from '../spinner/spinner';

type Props = {
  handleBuyButtonClick(camera: Camera): void;
};

function ProductInfo({ handleBuyButtonClick }: Props): JSX.Element {

  const camera = useAppSelector(getCamera);

  if (!camera) {
    return <Spinner />;
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${camera.previewImg}, /${camera.previewImgWebp2x} 2x`} />
            <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="560" height="480" alt={camera.name} />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{getCameraTitle(camera)}</h1>
          <div className="rate product__rate">
            <Rating rating={camera.rating} />
            <p className="visually-hidden">Рейтинг: {camera.rating}</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
          </div>
          <p className="product__price"><span className="visually-hidden">Цена:</span>{getPrice(camera.price)} ₽</p>
          <button className="btn btn--purple" type="button" data-testid="add-to-cart" onClick={() => handleBuyButtonClick(camera)}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <ProductTabs />
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
