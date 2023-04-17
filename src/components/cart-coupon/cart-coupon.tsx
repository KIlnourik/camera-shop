import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { validateCouponAction } from '../../store/api-actions';
import { getCouponValidationStatus, getDiscountValue, getValidCoupon } from '../../store/coupon-process/selector';
import { CouponPost } from '../../types/coupon-post';
import { getValidClassname } from '../../utils/utils';
import { resetCoupon } from '../../store/coupon-process/coupon-process';
import { getOrderStatus } from '../../store/order-process/selector';

function CartCoupon(): JSX.Element {
  const dispatch = useAppDispatch();
  const isValidCoupon = useAppSelector(getCouponValidationStatus);
  const disount = useAppSelector(getDiscountValue);
  const couponRef = useRef<HTMLInputElement>(null);
  const validCoupon = useAppSelector(getValidCoupon);
  const [isValid, setValid] = useState<boolean | undefined>(undefined);
  const orderStatus = useAppSelector(getOrderStatus);

  const onSubmit = (couponData: CouponPost) => {
    dispatch(validateCouponAction(couponData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (couponRef.current?.value) {
      onSubmit({
        coupon: couponRef.current.value,
      });
    }
  };

  const handleInputChange = () => {
    if (!couponRef.current?.value) {
      setValid(undefined);
      dispatch(resetCoupon());
    }
  };

  useEffect(() => {
    setValid(isValidCoupon);
    if (isValidCoupon && validCoupon && couponRef.current !== null) {
      couponRef.current.value = validCoupon;
    }
    if (orderStatus && couponRef.current !== null) {
      couponRef.current.value = '';
    }
  }, [isValidCoupon, disount, validCoupon, orderStatus]);

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#" onSubmit={handleSubmit}>
          <div className={`custom-input ${getValidClassname(isValid)}`}>
            <label><span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" ref={couponRef} onChange={handleInputChange} placeholder="Введите промокод" />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartCoupon;
