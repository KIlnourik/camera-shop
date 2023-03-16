import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-process/selector';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type Props = {
  filteredCameras: Camera[] | undefined;
};

function HeaderSearchFormList({ filteredCameras }: Props): JSX.Element {
  const cameras = useAppSelector(getCameras);

  if (filteredCameras) {
    return (
      <ul className="form-search__select-list">
        {filteredCameras.map((camera) => (
          <li className="form-search__select-item" tabIndex={1} key={camera.id}>
            <Link to={`cameras/${camera.id}/${AppRoute.Parameters}`}> {camera.name}</Link >
          </li >
        ))}
      </ul >
    );
  }

  return (
    <ul className="form-search__select-list" >
      {cameras.map((camera) => (
        <li className="form-search__select-item" tabIndex={0} key={camera.id}>
          <Link to={`cameras/${camera.id}/${AppRoute.Parameters}`}>{camera.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HeaderSearchFormList;
