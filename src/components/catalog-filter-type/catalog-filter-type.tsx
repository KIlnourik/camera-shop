import { Filters } from '../../const';

type Props = {
  types: string[];
  category: string;
  handleTypesChange(type: string): void;
};

function CatalogFilterType({ types, category, handleTypesChange }: Props): JSX.Element {

  return (

    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="digital"
            checked={types.includes(Filters.digital)}
            onChange={() => handleTypesChange(Filters.digital)}
          /><span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="film"
            checked={types.includes(Filters.film) && category !== Filters.videocamera}
            onChange={() => handleTypesChange(Filters.film)}
            disabled={category === Filters.videocamera}
          /><span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="snapshot"
            checked={types.includes(Filters.snapshot) && category !== Filters.videocamera}
            onChange={() => handleTypesChange(Filters.snapshot)}
            disabled={category === Filters.videocamera}
          /><span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="collection"
            checked={types.includes(Filters.collection)}
            onChange={() => handleTypesChange(Filters.collection)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterType;
