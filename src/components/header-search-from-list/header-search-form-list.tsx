import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAllCameras } from '../../store/camera-process/selector';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { KeyboardEvent, useRef, useState } from 'react';

type Props = {
  filteredCameras: Camera[] | undefined;
};

function HeaderSearchFormList({ filteredCameras }: Props): JSX.Element {
  const cameras = useAppSelector(getAllCameras);
  const [activeCamera, setActiveCamera] = useState(0);
  const navigate = useNavigate();
  const localListRef = useRef<HTMLUListElement>(null);

  const handleItemClick = (id: number) => {
    navigate(`cameras/${id}/${AppRoute.Parameters}`);
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'ArrowUp') {
      // eslint-disable-next-line no-console
      console.log('Arrow Clicked - 1');
      activeCamera > 0 ? setActiveCamera(activeCamera - 1) : setActiveCamera(0);
    }
    if (evt.key === 'ArrowDown' &&
      ((filteredCameras && activeCamera <= filteredCameras?.length)
        || activeCamera <= cameras.length)) {
      // eslint-disable-next-line no-console
      console.log('Arrow Clicked + 1');
      setActiveCamera(activeCamera + 1);
    }
  };

  return (
    <ul className="form-search__select-list " ref={localListRef}>
      {filteredCameras && (filteredCameras.map((camera) => (
        <li className="form-search__select-item"
          key={camera.id}
          tabIndex={0}
          onClick={() => handleItemClick(camera.id)}
          onKeyDown={handleKeydown}
        >
          {camera.name}
        </li >
      )))}
    </ul >
  );

}

export default HeaderSearchFormList;
