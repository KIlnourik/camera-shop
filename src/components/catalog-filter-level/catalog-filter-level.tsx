import { Filters } from '../../const';

type Props = {
  levels: string[];
  handleLevelsChange(type: string): void;
};

function CatalogFilterLevel({ levels, handleLevelsChange }: Props): JSX.Element {

  return (

    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="zero"
            checked={levels.includes(Filters.zero)}
            onChange={() => handleLevelsChange(Filters.zero)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="non-professional"
            checked={levels.includes(Filters.nonProfessional)}
            onChange={() => handleLevelsChange(Filters.nonProfessional)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="professional"
            checked={levels.includes(Filters.professional)}
            onChange={() => handleLevelsChange(Filters.professional)}
          />
          <span className="custom-checkbox__icon">
          </span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CatalogFilterLevel;
