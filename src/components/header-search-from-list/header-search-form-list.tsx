import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAllCameras } from '../../store/camera-process/selector';
import { AppRoute, STATE_ZERO, OFFSET_ONE } from '../../const';
import { Camera } from '../../types/camera';
import { KeyboardEvent, useRef, useState } from 'react';

type Props = {
  filteredCameras: Camera[] | undefined;
};

function HeaderSearchFormList({ filteredCameras }: Props): JSX.Element {
  const cameras = useAppSelector(getAllCameras);
  const [activeCamera, setActiveCamera] = useState(STATE_ZERO);
  const navigate = useNavigate();
  const localListRef = useRef<HTMLUListElement>(null);

  const handleItemClick = (id: number) => {
    navigate(`cameras/${id}/${AppRoute.Parameters}`);
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'ArrowUp') {
      activeCamera > 0 ? setActiveCamera(activeCamera - OFFSET_ONE) : setActiveCamera(STATE_ZERO);
    }
    if (evt.key === 'ArrowDown' &&
      ((filteredCameras && activeCamera <= filteredCameras?.length)
        || activeCamera <= cameras.length)) {
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
