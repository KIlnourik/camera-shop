import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import { Camera } from '../../types/camera';
import { getPrice } from '../../utils/utils';
import { STATE_ZERO } from '../../const';
import { getDiscountValue, getValidCoupon } from '../../store/coupon-process/selector';
import { OrderPost } from '../../types/order-post';
import { sendOrderAction } from '../../store/api-actions';
import { getOrderStatus } from '../../store/order-process/selector';

type Props = {
  handleOrderSuccessPopupOpen(orederStatus?: boolean): void;
}

const getSummaryValue = (products: Camera[]) => products.reduce((accum, product) =>
  accum + product.price, STATE_ZERO);

const getProductsIds = (products: Camera[]) => {
  const items: number[] = [];
  products.forEach((product) => items.push(product.id));
  return Array.from(new Set(items));
};


function CartSummaryOrder({ handleOrderSuccessPopupOpen }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const discount = useAppSelector(getDiscountValue);
  const cartProducts = useAppSelector(getCartProducts);
  const validCoupon = useAppSelector(getValidCoupon);
  const orderSendStatus = useAppSelector(getOrderStatus);

  const [summaryValue, setSummaryValue] = useState(STATE_ZERO);
  const [discountSum, setDiscountSum] = useState(STATE_ZERO);
  const [totalSum, setTotalSum] = useState(STATE_ZERO);

  const onSubmit = (data: OrderPost) => {
    dispatch(sendOrderAction(data));
  };

  const handleOrderSumbit = () => {
    if (cartProducts.length && validCoupon) {
      onSubmit({
        camerasIds: getProductsIds(cartProducts),
        coupon: validCoupon,
      });
    }
    if (cartProducts.length && !validCoupon) {
      onSubmit({
        camerasIds: getProductsIds(cartProducts),
        coupon: null,
      });
    }
  };

  useEffect(() => {
    setSummaryValue(getSummaryValue(cartProducts));

    if (discount) {
      setDiscountSum((summaryValue * discount) / 100);
    } else {
      setDiscountSum(STATE_ZERO);
    }

    handleOrderSuccessPopupOpen(orderSendStatus);

    setTotalSum(summaryValue - discountSum);

  }, [cartProducts, discount, discountSum, orderSendStatus, summaryValue]);

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
      <button className="btn btn--purple" type="submit" onClick={handleOrderSumbit}>Оформить заказ
      </button>
    </div>
  );
}

export default CartSummaryOrder;
