import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/data-process/selector';
import { Tabs } from '../../const';
import ProductDescTab from '../product-desc-tab/product-desc-tab';
import ProductParametersTab from '../product-parameters-tab/product-parameters-tab';
import Spinner from '../spinner/spinner';


function ProductTabs(): JSX.Element {

  const camera = useAppSelector(getCamera);

  if (!camera) {
    return <Spinner />;
  }

  const [tab, setTab] = useState(Tabs.Parameters);

  const handlerParametersTabClick = () => {
    setTab(Tabs.Parameters);
  };

  const handlerDescTabClick = () => {
    setTab(Tabs.Description);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${tab === Tabs.Parameters ? 'is-active' : ''}`} type="button" onClick={handlerParametersTabClick}>Характеристики</button>
        <button className={`tabs__control ${tab === Tabs.Description ? 'is-active' : ''}`} type="button" onClick={handlerDescTabClick}>Описание</button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${tab === Tabs.Parameters ? 'is-active' : ''}`}>
          <ProductParametersTab />
        </div>
        <div className={`tabs__element ${tab === Tabs.Description ? 'is-active' : ''}`}>
          <ProductDescTab />
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
