import { useState } from 'react';
import { Camera } from '../../types/camera';
import SimilarProductsList from '../similar-products-list/similar-products-list';
import SimilarSliderControls from '../similar-slider-controls/similar-slider-controls';

type Props = {
  handleBuyButtonClick(camera: Camera): void;
}

function SimilarProductsSlider({handleBuyButtonClick}: Props): JSX.Element {
  const [sliderOffset, setSliderOffset] = useState(0);

  const handlePrevButtonClick = () => {
    setSliderOffset(sliderOffset - 1);
  };

  const handleNextButtonClick = () => {
    setSliderOffset(sliderOffset + 1);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <SimilarProductsList
            sliderOffset={sliderOffset}
            handleBuyButtonClick={handleBuyButtonClick}
          />

          <SimilarSliderControls
            sliderOffset={sliderOffset}
            handlePrevButtonClick={handlePrevButtonClick}
            handleNextButtonClick={handleNextButtonClick}
          />
        </div>
      </div>
    </section>
  );
}

export default SimilarProductsSlider;
