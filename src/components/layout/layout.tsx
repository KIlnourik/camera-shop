import { Link, Outlet } from 'react-router-dom';
import { AppRoute } from '../../const';
import FooterNavList from '../footer-nav-list/footer-nav-list';
import HeaderSearchForm from '../header-search-form/header-search-form';
import Logo from '../logo/logo';
import NavList from '../nav-list/nav-list';
import SocialList from '../social-list/social-list';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCartProducts } from '../../store/cart-process/selector';

function Layout(): JSX.Element {
  const cartProducts = useAppSelector(getCartProducts);
  const [cartProductsCount, setCartProductsCount] = useState<number>(0);

  useEffect(() => {
    setCartProductsCount(cartProducts.length);
  }, [cartProducts]);

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <Logo />
          <nav className="main-nav header__main-nav">
            <NavList />
          </nav>
          <HeaderSearchForm />
          <Link className="header__basket-link" to={AppRoute.Cart}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            {cartProductsCount !== 0 && <span className="header__basket-count">{cartProductsCount}</span>}
          </Link>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <Logo isFooter />
            <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
            <SocialList />
          </div>
          <FooterNavList />
        </div>
      </footer>

    </>
  );
}

export default Layout;
