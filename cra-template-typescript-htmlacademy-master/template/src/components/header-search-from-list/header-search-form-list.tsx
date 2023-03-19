import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-process/selector';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { KeyboardEvent, SyntheticEvent, useState } from 'react';

type Props = {
  filteredCameras: Camera[] | undefined;
  handleBlurCapture(evt: SyntheticEvent): void;
  handleFormActive(): void;
};

function HeaderSearchFormList({ filteredCameras, handleBlurCapture, handleFormActive }: Props): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const [activeCamera, setActiveCamera] = useState(0);
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`cameras/${id}/${AppRoute.Parameters}`);
  };

  const handleArrowsKeydown = (evt: KeyboardEvent) => {
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
    <ul className="form-search__select-list "
      onFocusCapture={handleFormActive}
    >
      {filteredCameras ? (filteredCameras.map((camera) => (
        <li className="form-search__select-item"
          key={camera.id}
          tabIndex={0}
          onClick={() => handleItemClick(camera.id)}
          onKeyDown={handleArrowsKeydown}
          onFocusCapture={handleFormActive}
        >
          {camera.name}
        </li >
      )))
        : cameras.map((camera) => (
          <li className="form-search__select-item" tabIndex={1} key={camera.id} onClick={() => handleItemClick(camera.id)}>
            {camera.name}
          </li>
        ))}
    </ul >
  );

}

export default HeaderSearchFormList;
