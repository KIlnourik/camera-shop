import { useState, KeyboardEvent, useRef, useEffect, SyntheticEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { getAllCameras } from '../../store/camera-process/selector';
import { Camera } from '../../types/camera';
import HeaderSearchFormList from '../header-search-from-list/header-search-form-list';
import { getCameraTitle } from '../../utils/utils';

const filterCameras = (inputValue: string | undefined, cameras: Camera[]) => {
  if (inputValue && cameras) {
    return cameras.filter((camera) => getCameraTitle(camera).toLowerCase().includes(inputValue.toLowerCase()));
  }
};

function HeaderSearchForm(): JSX.Element {

  const cameras = useAppSelector(getAllCameras);
  const [isFormActive, setFormActive] = useState(false);
  const [filteredCameras, setFilteredCameras] = useState<Camera[] | undefined>(cameras);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setFormActive(false);
      if (inputRef.current?.value) {
        inputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    if (inputRef.current?.value) {
      setFilteredCameras(filterCameras(inputRef.current?.value, cameras));
      if (filteredCameras && filteredCameras.length) {
        setFormActive(true);
      } else {
        setFormActive(false);
      }
    }

  }, [cameras, filteredCameras, inputRef]);

  const handleClearButtonClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (inputRef.current?.value) {
      inputRef.current.value = '';
      setFormActive(false);
      setFilteredCameras(cameras);
    }
  };

  const handleInputChange = () => {
    if (inputRef.current?.value && inputRef.current?.value !== '') {
      setFilteredCameras(filterCameras(inputRef.current?.value, cameras));
      setFormActive(true);
    } else {
      setFormActive(false);
    }

  };

  return (
    <div className={`form-search ${isFormActive ? 'list-opened' : ''}`}
      onKeyDown={handleEscKeydown}
    >
      <form >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            ref={inputRef}
            onChange={handleInputChange}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
          />
        </label>
        <HeaderSearchFormList
          filteredCameras={filteredCameras}
        />
      </form>
      <button className="form-search__reset" type="reset" onClick={handleClearButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default HeaderSearchForm;
