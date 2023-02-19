import { useState } from 'react';
import SimilarProductsList from '../similar-products-list/similar-products-list';

function SimilarProductsSlider(): JSX.Element {
  const [sliderOffset, setSliderOffset] = useState(0);

  const handleSliderNextButtonClick = () => {
    setSliderOffset(sliderOffset + 1);
    console.log(sliderOffset);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <SimilarProductsList sliderOffset={sliderOffset} />
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
            disabled>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд"
            onClick={handleSliderNextButtonClick}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProductsSlider;
