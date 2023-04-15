import CartCoupon from '../cart-coupon/cart-coupon';
import CartSummaryOrder from '../cart-summary-order/cart-summary-order';

function CartSummary(): JSX.Element {

  return (
    <div className="basket__summary">
      {<CartCoupon />}
      {<CartSummaryOrder />}
    </div>
  );
}

export default CartSummary;
