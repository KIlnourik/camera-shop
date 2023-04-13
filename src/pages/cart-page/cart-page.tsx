import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CartProducts from '../../components/cart-products/cart-products';
import CartSummary from '../../components/cart-summary/cart-summary';

function CartPage(): JSX.Element {
  return (
    <div className="page-content">
      {<Breadcrumbs isCartPage/>}
      <section className="basket">
        <div className="container">
          <h1 className="title title--h2">Корзина</h1>
          {<CartProducts />}
          {<CartSummary />}
        </div>
      </section>
    </div>
  );
}

export default CartPage;
