import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/data-process/selector';
import Spinner from '../spinner/spinner';

function ProductParametersTab(): JSX.Element {

  const camera = useAppSelector(getCamera);

  if (!camera) {
    return <Spinner />;
  }

  return (
    <ul className="product__tabs-list">
      <li className="item-list"><span className="item-list__title">Артикул:</span>
        <p className="item-list__text"> {camera.vendorCode}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Категория:</span>
        <p className="item-list__text">{camera.category}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">{camera.type}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Уровень:</span>
        <p className="item-list__text">{camera.level}</p>
      </li>
    </ul>
  );
}

export default ProductParametersTab;
