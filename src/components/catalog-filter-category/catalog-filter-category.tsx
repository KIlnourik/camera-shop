import { Filters } from '../../const';

type Props = {
  category: string;
  handleCategoryChange(chosenCategory: string): void;
};
function CatalogFilterCategory({ category, handleCategoryChange }: Props): JSX.Element {
  const currentCategory = category;

  return (

    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="photocamera"
            checked={currentCategory === Filters.photocamera}
            onChange={() => handleCategoryChange(Filters.photocamera)}
          />
          <span className="custom-checkbox__icon" ></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="videocamera"
            checked={currentCategory === Filters.videocamera}
            onChange={() => handleCategoryChange(Filters.videocamera)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterCategory;
