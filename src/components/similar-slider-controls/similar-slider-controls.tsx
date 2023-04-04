import { MAX_SHOWN_SLIDER_CARDS } from '../../const';
import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/camera-process/selector';

type Props = {
  sliderOffset: number;
  handlePrevButtonClick(): void;
  handleNextButtonClick(): void;
}

function SimilarSliderControls({ sliderOffset, handlePrevButtonClick, handleNextButtonClick }: Props): JSX.Element {

  const similarCameras = useAppSelector(getSimilarCameras);
  return (
    <>
      <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={handlePrevButtonClick} disabled={sliderOffset === 0}>
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд"
        onClick={handleNextButtonClick} disabled={sliderOffset + MAX_SHOWN_SLIDER_CARDS === similarCameras.length}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </>
  );
}

export default SimilarSliderControls;
