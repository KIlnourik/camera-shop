import { useEffect, useRef, useState } from 'react';
import { Camera } from '../../types/camera';
import { getCameraTitle, getPrice } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import { Filters, ProductsCount } from '../../const';
import { addToCart, decreaseProducts, setProductsCount } from '../../store/cart-process/cart-process';

type Props = {
  cartProduct: Camera;
  handleDeleteButtonClick(product: Camera): void;
};

const getProductCount = (productsList: Camera[], currentProduct: Camera) => {
  let items = [];
  items = productsList.filter((product) => product.id === currentProduct.id);
  return items.length;
};

function CartProduct({ cartProduct, handleDeleteButtonClick }: Props): JSX.Element {
  const [totalPrice, setTotalPrice] = useState(cartProduct.price);
  const [isDisabledPlusBtn, setDisabledPlusBtn] = useState(false);
  const [isDisabledMinusBtn, setDisabledMinusBtn] = useState(false);
  const cartProducts = useAppSelector(getCartProducts);
  const dispatch = useAppDispatch();
  const productCountRef = useRef<HTMLInputElement | null>(null);
  const [countValue, setCountValue] = useState('');

  useEffect(() => {
    if (productCountRef.current !== null) {
      productCountRef.current.value = getProductCount(cartProducts, cartProduct).toString();
      setCountValue(productCountRef.current.value);
      (productCountRef.current.valueAsNumber <= ProductsCount.minCount) ?
        setDisabledMinusBtn(true) :
        setDisabledMinusBtn(false);

      (productCountRef.current.valueAsNumber >= ProductsCount.maxCount) ?
        setDisabledPlusBtn(true) :
        setDisabledPlusBtn(false);
    }

    if (productCountRef.current?.value) {
      setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
    }


  }, [cartProducts, cartProduct]);

  const handleInputBlur = () => {
    if (productCountRef.current?.value) {
      if (productCountRef.current?.valueAsNumber < ProductsCount.minCount) {
        productCountRef.current.value = ProductsCount.minCount.toString();
        setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
      }
      if (productCountRef.current?.valueAsNumber > ProductsCount.maxCount) {
        productCountRef.current.value = ProductsCount.maxCount.toString();
        setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
      }

      dispatch(setProductsCount(Array(productCountRef.current?.valueAsNumber).fill(cartProduct) as Camera[]));
    }
    if (productCountRef.current?.value === '') {
      productCountRef.current.value = countValue;
      setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
      dispatch(setProductsCount(Array(productCountRef.current?.valueAsNumber).fill(cartProduct) as Camera[]));
    }
  };

  const handleDeleteCountBtnClick = () => {
    if (productCountRef.current?.value) {
      dispatch(decreaseProducts(cartProduct));
      setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
    }
  };

  const handleAddCountBtnClick = () => {
    if (productCountRef.current?.value) {
      dispatch(addToCart(cartProduct));
      setTotalPrice(cartProduct.price * productCountRef.current.valueAsNumber);
    }
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${cartProduct.previewImgWebp}, /${cartProduct.previewImgWebp2x} 2x`} />
          <img src={`/${cartProduct.previewImg}`} srcSet={`/${cartProduct.previewImg2x} 2x`} width="280" height="240" alt={cartProduct.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{getCameraTitle(cartProduct)}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{cartProduct.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${cartProduct.type} ${cartProduct.category === Filters.videocamera ? 'видеокамера' : 'фотокамера'}`}</li>
          <li className="basket-item__list-item">{cartProduct.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {getPrice(cartProduct.price)} ₽
      </p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev"
          onClick={handleDeleteCountBtnClick}
          aria-label="уменьшить количество товара"
          disabled={isDisabledMinusBtn}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1"
          ref={productCountRef} min="1" max="99"
          onBlur={handleInputBlur}
          aria-label="количество товара"
        />
        <button className="btn-icon btn-icon--next"
          onClick={handleAddCountBtnClick}
          aria-label="увеличить количество товара"
          disabled={isDisabledPlusBtn}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getPrice(totalPrice)} ₽</div>
      <button className="cross-btn" type="button" onClick={() => handleDeleteButtonClick(cartProduct)} aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default CartProduct;
