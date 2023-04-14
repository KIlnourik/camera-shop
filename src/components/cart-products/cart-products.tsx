import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';
import CartProduct from '../cart-product/cart-product';
import { Camera } from '../../types/camera';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const getUniqueProducts = (products: Camera[]) => {
  const uniqueProductsList = Array.from(new Set(products.map((product) => JSON.stringify(product))));

  return uniqueProductsList.map((product) => JSON.parse(product) as Camera);
};

function CartProducts(): JSX.Element {

  const cartProducts = useAppSelector(getCartProducts);
  const [uniqueProducts, setUniqueProducts] = useState<Camera[]>([]);

  useEffect(() => {
    setUniqueProducts(getUniqueProducts(cartProducts));
  }, [cartProducts]);

  return (
    <ul className="basket__list">
      {uniqueProducts.length ? uniqueProducts.map((product) => (
        <CartProduct cartProduct={product} key={product.id} />
      )) :
        <>
          <br /><h3 className="title title--h3">В корзине пока что пусто.</h3>
          <Link className="btn btn--purple" style={{ width: '350px' }}
            to={AppRoute.Catalog}
          >
            Перейти в Каталог
          </Link>
        </>}
    </ul>
  );
}

export default CartProducts;
