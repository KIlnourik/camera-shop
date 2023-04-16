import { useState, KeyboardEvent } from 'react';
import { Camera } from '../../types/camera';
import { Popup } from '../../const';
import { useAppSelector } from '../../hooks';
import { getOrderStatus } from '../../store/order-process/selector';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartProducts from '../../components/cart-products/cart-products';
import DeleteItemPopup from '../../components/delete-item-popup/delete-item-popup';
import CartCoupon from '../../components/cart-coupon/cart-coupon';
import CartSummaryOrder from '../../components/cart-summary-order/cart-summary-order';
import OrderSuccessPopup from '../../components/order-success-popup/order-success-popup';

function CartPage(): JSX.Element {
  const [isActivePopup, setActivePopup] = useState<string | undefined>(undefined);
  const [targetProduct, setTargetProduct] = useState<Camera | undefined>(undefined);
  const orderStatus = useAppSelector(getOrderStatus);

  const handleDeleteButtonClick = (product: Camera) => {
    setActivePopup(Popup.DeleteProductPopup);
    setTargetProduct(product);
  };

  const handleOrderSuccessPopupOpen = () => {
    if (orderStatus) {
      setActivePopup(undefined);
      setActivePopup(Popup.OrderSuccessPopup);
    }
  };

  const handleClosePopup = () => {
    setActivePopup(undefined);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setActivePopup(undefined);
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
              {<CartSummaryOrder handleOrderSuccessPopupOpen={handleOrderSuccessPopupOpen}/>}
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
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
        />}
    </>
  );
}

export default CartPage;
