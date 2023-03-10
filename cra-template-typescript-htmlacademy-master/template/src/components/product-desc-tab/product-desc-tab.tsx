import { useAppSelector } from '../../hooks';
import { getCamera } from '../../store/camera-process/selector';
import Spinner from '../spinner/spinner';

function ProductDescTab(): JSX.Element {
  const camera = useAppSelector(getCamera);

  if (!camera) {
    return <Spinner />;
  }

  return (
    <div className="product__tabs-text" data-testid="tabs-text">
      <p>{camera.description}</p>
    </div>
  );
}

export default ProductDescTab;
