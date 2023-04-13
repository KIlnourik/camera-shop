import { useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import CartProduct from '../cart-product/cart-product';

function CartProducts(): JSX.Element {

  const products = useAppSelector(getCartProducts);
  const uniqueProducts = Array.from(new Set(products));

  return (
    <ul className="basket__list">
      {uniqueProducts.map((product) => (
        <CartProduct cartProduct={product} key={product.id} />
      ))}
    </ul>
  );
}

export default CartProducts;
