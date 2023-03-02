import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/data-process/selector';
import { AppRoute, Tabs } from '../../const';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function ProductTabs(): JSX.Element {

  const camera = useAppSelector(getCamera);
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const urlPathname = pathname.split('/');

  const [tab, setTab] = useState(
    (urlPathname[urlPathname.length - 1] === id
      || urlPathname[urlPathname.length - 1] === AppRoute.Parameters)
      ? Tabs.Parameters
      : Tabs.Description);

  if (!id) {
    return <NotFoundPage />;
  }

  const handlerParametersTabClick = () => {
    setTab(Tabs.Parameters);
    navigate(`/cameras/${id}/${AppRoute.Parameters}`);
  };

  const handlerDescTabClick = () => {
    setTab(Tabs.Description);
    navigate(`/cameras/${id}/${AppRoute.Description}`);
  };

  if (!camera) {
    return <Spinner />;
  }

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls" data-testid="controls">
        <button className={`tabs__control ${tab === Tabs.Parameters ? 'is-active' : ''}`} type="button" onClick={handlerParametersTabClick}>Характеристики</button>
        <button className={`tabs__control ${tab === Tabs.Description ? 'is-active' : ''}`} type="button" onClick={handlerDescTabClick}>Описание</button>
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
