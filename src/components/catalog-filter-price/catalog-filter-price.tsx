import { useEffect, useRef, useState } from 'react';
import { getValidClassname } from '../../utils/utils';

type Props = {
  minPrice: string;
  maxPrice: string;
  handlePriceChange(value?: string): void;
  handlePriceUpChange(value?: string): void;
}

function CatalogFilterPrice({
  minPrice,
  maxPrice,
  handlePriceChange,
  handlePriceUpChange
}: Props): JSX.Element {

  const priceRef = useRef<HTMLInputElement | null>(null);
  const priceUpRef = useRef<HTMLInputElement | null>(null);

  const [isValidPrice, setIsValidPrice] = useState<boolean | undefined>(undefined);
  const [isValidPriceUp, setIsValidPriceUp] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (priceRef.current?.value) {
      ((priceRef.current.valueAsNumber < Number(minPrice)) ||
        (priceRef.current?.value && priceRef.current.valueAsNumber < 0) ||
        (priceRef.current?.value && priceRef.current.valueAsNumber > Number(maxPrice))) ?
        setIsValidPrice(false) :
        setIsValidPrice(true);
    } else {
      setIsValidPrice(undefined);
    }

    if (priceUpRef.current?.value) {

      ((priceUpRef.current.valueAsNumber < Number(minPrice)) ||
        (priceUpRef.current?.value && priceUpRef.current.valueAsNumber < 0) ||
        priceUpRef.current.valueAsNumber > Number(maxPrice) ||
        (priceUpRef.current?.value &&
          priceRef.current?.value &&
          priceUpRef.current.valueAsNumber < priceRef.current.valueAsNumber)) ?
        setIsValidPriceUp(false) :
        setIsValidPriceUp(true);
    } else {
      setIsValidPriceUp(undefined);
    }
  }, [priceRef.current?.value, priceUpRef.current?.value, minPrice, maxPrice]);

  const handlePriceInputBlur = () => {
    if (priceRef.current?.value) {
      if ((priceRef.current.valueAsNumber < Number(minPrice)) ||
        (priceRef.current.valueAsNumber < 0)) {
        priceRef.current.value = minPrice;
      }
      if (priceRef.current.valueAsNumber > Number(maxPrice)) {
        priceRef.current.value = maxPrice;
      }
    }
  };

  const handlePriceUpInputBlur = () => {
    if (priceUpRef.current?.value) {
      if (priceUpRef.current.valueAsNumber > Number(maxPrice)) {
        priceUpRef.current.value = maxPrice;
      }

      if ((priceUpRef.current.valueAsNumber < Number(minPrice)) ||
        (priceUpRef.current?.value && priceUpRef.current.valueAsNumber < 0)) {
        priceUpRef.current.value = minPrice;
      }

      if (priceUpRef.current?.value &&
        priceRef.current?.value &&
        priceUpRef.current.valueAsNumber < priceRef.current.valueAsNumber) {
        priceUpRef.current.value = priceRef.current.value;
      }
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${getValidClassname(isValidPrice)}`}>
          <label>
            <input type="number" ref={priceRef}
              onChange={() => handlePriceChange(priceRef.current?.value)}
              onBlur={handlePriceInputBlur}
              placeholder={minPrice ? minPrice.toString() : 'от'}
              min="0"
            />
          </label>
        </div>
        <div className={`custom-input ${getValidClassname(isValidPriceUp)}`}>
          <label>
            <input type="number" ref={priceUpRef}
              onChange={() => handlePriceUpChange(priceUpRef.current?.value)}
              onBlur={handlePriceUpInputBlur}
              placeholder={maxPrice ? maxPrice.toString() : 'до'}
              min={minPrice}
              max={maxPrice}
            />
          </label>
        </div>
      </div>
    </fieldset >
  );
}

export default CatalogFilterPrice;
