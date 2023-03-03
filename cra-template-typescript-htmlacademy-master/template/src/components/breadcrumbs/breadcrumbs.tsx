import { Link, useLocation, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Camera } from '../../types/camera';

type Props = {
  isProductPage?: boolean;
  camera?: Camera;
};

function Breadcrumbs({ isProductPage, camera }: Props): JSX.Element {

  const location = useLocation();
  const { page } = useParams();

  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href="index.html">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </a>
          </li>
          {(location.pathname === AppRoute.Catalog || location.pathname === `${AppRoute.Catalog}/${page}`)
            ?
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>
            :
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={`${AppRoute.Catalog}`}>Каталог
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>}
          {isProductPage &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {camera?.name}
              </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
