import { Outlet } from "react-router-dom";
import FooterNavList from "../footer-nav-list/footer-nav-list";
import Logo from "../logo/logo";
import NavList from "../nav-list/nav-list";
import SocialList from "../social-list/social-list";

function Layout(): JSX.Element {
  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <Logo />
          <nav className="main-nav header__main-nav">
            <NavList />
          </nav>
          <div className="form-search">
            <form>
              <label>
                <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-lens"></use>
                </svg>
                <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
              </label>
              <ul className="form-search__select-list">
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 8i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
                <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
              </ul>
            </form>
            <button className="form-search__reset" type="reset">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button>
          </div>
          <a className="header__basket-link" href="#">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg><span className="header__basket-count">3</span></a>
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
