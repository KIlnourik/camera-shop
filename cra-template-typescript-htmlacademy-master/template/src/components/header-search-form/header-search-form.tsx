import { useState, KeyboardEvent, useRef, useEffect, SyntheticEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-process/selector';
import { Camera } from '../../types/camera';
import HeaderSearchFormList from '../header-search-from-list/header-search-form-list';

const filterCameras = (inputValue: string | undefined, cameras: Camera[]) => {
  if (inputValue && cameras) {
    return cameras.filter((camera) => camera.name.toLowerCase().includes(inputValue.toLowerCase()));
  }
};

function HeaderSearchForm(): JSX.Element {

  const cameras = useAppSelector(getCameras);
  const [isFormActive, setFormActive] = useState(false);
  const [filteredCameras, setFilteredCameras] = useState<Camera[] | undefined>(cameras);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormClick = () => {
    setFormActive(true);
  };
  const handleFormFocus = () => {
    setFormActive(true);
  };

  const handleFormBlur = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setFormActive(false);
    // eslint-disable-next-line no-console
    console.log('Input lost focus');
  };
  const handleDropDownBlur = (evt: SyntheticEvent) => {
    evt.preventDefault();
    handleFormBlur(evt);
    // setFormActive(false);
    // eslint-disable-next-line no-console
    console.log('DropDown lost focus');
  };

  const handleDropDownFocused = () => {
    setFormActive(true);
    // eslint-disable-next-line no-console
    console.log('Dropdown focused');
  };

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
    } else {
      setFilteredCameras(cameras);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameras, inputRef.current?.value]);

  const handleClearButtonClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (inputRef.current?.value) {
      inputRef.current.value = '';
      setFilteredCameras(cameras);
    }
  };

  const handleInputChange = () => {
    if (inputRef) {
      setFilteredCameras(filterCameras(inputRef.current?.value, cameras));
    }
  };

  return (
    <div className={`form-search ${isFormActive ? 'list-opened' : ''}`}
      onClick={handleFormClick}
      onFocus={handleFormFocus}
      onKeyDown={handleEscKeydown}
    >
      <form>
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
          handleBlurCapture={handleDropDownBlur}
          handleFormActive={handleDropDownFocused}
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
