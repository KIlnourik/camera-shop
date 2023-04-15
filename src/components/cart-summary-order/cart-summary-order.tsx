import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import { Camera } from '../../types/camera';
import { getPrice } from '../../utils/utils';
import { STATE_ZERO } from '../../const';
import { getDiscountValue } from '../../store/coupon-process/selector';

const getSummaryValue = (products: Camera[]) => products.reduce((accum, product) =>
  accum + product.price, STATE_ZERO);

function CartSummaryOrder(): JSX.Element {
  const discount = useAppSelector(getDiscountValue);
  const cartProducts = useAppSelector(getCartProducts);
  const [summaryValue, setSummaryValue] = useState(STATE_ZERO);
  const [discountSum, setDiscountSum] = useState(STATE_ZERO);
  const [totalSum, setTotalSum] = useState(STATE_ZERO);

  useEffect(() => {
    setSummaryValue(getSummaryValue(cartProducts));
    if (discount !== undefined) {
      setDiscountSum((summaryValue * discount) / 100);
    } else {
      setDiscountSum(STATE_ZERO);
    }
    setTotalSum(summaryValue - discountSum);
  }, [cartProducts, discount, discountSum, summaryValue]);

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{getPrice(summaryValue)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={`basket__summary-value ${discount && discountSum !== STATE_ZERO ? 'basket__summary-value--bonus' : ''}`}>{getPrice(discountSum)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{getPrice(totalSum)} ₽</span>
      </p>
      <button className="btn btn--purple" type="submit">Оформить заказ
      </button>
    </div>
  );
}

export default CartSummaryOrder;
