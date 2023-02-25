import { Link, Outlet } from 'react-router-dom';
import { AppRoute } from '../../const';
import FooterNavList from '../footer-nav-list/footer-nav-list';
import HeaderSearchForm from '../header-search-form/header-search-form';
import Logo from '../logo/logo';
import NavList from '../nav-list/nav-list';
import SocialList from '../social-list/social-list';

function Layout(): JSX.Element {
  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <Logo />
          <nav className="main-nav header__main-nav">
            <NavList />
          </nav>
          <HeaderSearchForm />
          <Link className="header__basket-link" to={`${AppRoute.Catalog}/${AppRoute.Basket}`}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg><span className="header__basket-count">3</span>
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
