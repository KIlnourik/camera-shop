import { useState, KeyboardEvent } from 'react';
import { Camera } from '../../types/camera';
import { Popup } from '../../const';
import { resetCart } from '../../store/cart-process/cart-process';
import { resetCoupon } from '../../store/coupon-process/coupon-process';
import { resetOrderStatus } from '../../store/order-process/order-process';
import { useAppDispatch } from '../../hooks';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartProducts from '../../components/cart-products/cart-products';
import DeleteItemPopup from '../../components/delete-item-popup/delete-item-popup';
import CartCoupon from '../../components/cart-coupon/cart-coupon';
import CartSummaryOrder from '../../components/cart-summary-order/cart-summary-order';
import OrderSuccessPopup from '../../components/order-success-popup/order-success-popup';

function CartPage(): JSX.Element {
  const [isActivePopup, setActivePopup] = useState<string | null>(null);
  const [targetProduct, setTargetProduct] = useState<Camera | undefined | null>(undefined);
  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = (product: Camera) => {
    if (product !== null) {
      setActivePopup(Popup.DeleteProductPopup);
      setTargetProduct(product);
    }
  };

  const handleOrderSuccessPopupOpen = (orderStatus?: boolean) => {
    if (orderStatus) {
      setActivePopup(Popup.OrderSuccessPopup);
    } else {
      setActivePopup(null);
    }
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handleCloseSuccessPopup = (orderStatus?: boolean) => {
    if (orderStatus) {
      setActivePopup(null);
      dispatch(resetCart());
      dispatch(resetCoupon());
      dispatch(resetOrderStatus());
    }
    setActivePopup(null);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setActivePopup(null);
    }
  };

  return (
    <>
      <div className="page-content">
        {<Breadcrumbs isCartPage />}
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {<CartProducts handleDeleteButtonClick={handleDeleteButtonClick} />}
            <div className="basket__summary">
              {<CartCoupon />}
              {<CartSummaryOrder handleOrderSuccessPopupOpen={handleOrderSuccessPopupOpen} />}
            </div>
          </div>
        </section>
      </div>
      {isActivePopup === Popup.DeleteProductPopup &&
        <DeleteItemPopup
          cartProduct={targetProduct}
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
        />}
      {isActivePopup === Popup.OrderSuccessPopup &&
        <OrderSuccessPopup
          handleClosePopup={handleCloseSuccessPopup}
          handleEscKeydown={handleEscKeydown}
        />}
    </>
  );
}

export default CartPage;
