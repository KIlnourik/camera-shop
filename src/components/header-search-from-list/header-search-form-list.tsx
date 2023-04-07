import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { KeyboardEvent, useRef } from 'react';

type Props = {
  filteredCameras: Camera[] | undefined;
};

function HeaderSearchFormList({ filteredCameras }: Props): JSX.Element {
  const navigate = useNavigate();
  const localListRef = useRef<HTMLUListElement>(null);

  const handleItemClick = (id: number) => {
    navigate(`cameras/${id}/${AppRoute.Parameters}`);
  };

  const handleKeydown = (id: number, evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      navigate(`cameras/${id}/${AppRoute.Parameters}`);
    }
  };

  return (
    <ul className="form-search__select-list " ref={localListRef}>
      {filteredCameras && (filteredCameras.map((camera) => (
        <li className="form-search__select-item"
          key={camera.id}
          tabIndex={0}
          onClick={() => handleItemClick(camera.id)}
          onKeyDown={(evt) => handleKeydown(camera.id, evt)}
        >
          {camera.name}
        </li >
      )))}
    </ul >
  );

}

export default HeaderSearchFormList;
