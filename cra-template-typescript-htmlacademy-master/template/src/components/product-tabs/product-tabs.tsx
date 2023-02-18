import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/data-process/selector';
import { AppRoute, Tabs } from '../../const';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';


function ProductTabs(): JSX.Element {

  const camera = useAppSelector(getCamera);
  const navigate = useNavigate();
  const [tab, setTab] = useState(Tabs.Parameters);
  const { id } = useParams();

  const handlerParametersTabClick = () => {
    setTab(Tabs.Parameters);
    navigate(`${AppRoute.Catalog}/cameras/${id}/${AppRoute.Parameters}`);
  };

  const handlerDescTabClick = () => {
    setTab(Tabs.Description);
    navigate(`${AppRoute.Catalog}/cameras/${id}/${AppRoute.Description}`);
  };

  if (!camera) {
    return <Spinner />;
  }

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
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
