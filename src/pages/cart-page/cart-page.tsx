import { useState, KeyboardEvent } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartProducts from '../../components/cart-products/cart-products';
import CartSummary from '../../components/cart-summary/cart-summary';
import DeleteItemPopup from '../../components/delete-item-popup/delete-item-popup';
import { Camera } from '../../types/camera';

function CartPage(): JSX.Element {
  const [isDeletePopupActive, setDeletePopupActive] = useState(false);
  const [targetProduct, setTargetProduct] = useState<Camera | undefined>(undefined);

  const handleDeleteButtonClick = (product: Camera) => {
    setDeletePopupActive(true);
    setTargetProduct(product);
  };

  const handleClosePopup = () => {
    setDeletePopupActive(false);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setDeletePopupActive(false);
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
            {<CartSummary />}
          </div>
        </section>
      </div>
      {isDeletePopupActive &&
        <DeleteItemPopup
          cartProduct={targetProduct}
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
        />}
    </>
  );
}

export default CartPage;
