import { useEffect, useState } from 'react';
import { Filters } from '../../const';

type Props = {
  categoryQuery: string;
  typeQuery: string;
  levelQuery: string;
  setSearchParams(params: {
    category: string;
    type: string;
    level: string;
  }): void;
};

function CatalogFilter({ categoryQuery, typeQuery, levelQuery, setSearchParams }: Props): JSX.Element {

  const [currentCategory, setCurrentCategory] = useState(categoryQuery);
  const [currentType, setCurrentType] = useState(typeQuery);
  const [currentLevel, setCurrentLevel] = useState(levelQuery);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const handleTypeChange = (type: string) => {
    let types: string[] = [];
    (!currentType.length) ?
      types = [] :
      types = currentType.split(',');

    (!types.includes(type)) ?
      types.push(type) :
      types.filter((addedType) => addedType === type);

    // eslint-disable-next-line no-console
    console.log(types);

    setCurrentType(types.join(','));
  };

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level);
  };

  const handleResetClick = () => {
    setCurrentCategory('');
    setCurrentLevel('');
    setCurrentLevel('');
  };

  useEffect(() => {
    setSearchParams({ category: currentCategory, type: currentType, level: currentLevel });
  }, [currentCategory, currentLevel, currentType, setSearchParams]);

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera" checked={currentCategory === Filters.photocamera} onChange={() => handleCategoryChange('Фотоаппарат')} />
                <span className="custom-checkbox__icon" ></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera" checked={currentCategory === Filters.videocamera} onChange={() => handleCategoryChange('Видеокамера')} />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked={currentType === Filters.digital} onChange={() => handleTypeChange('Цифровая')} /><span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" checked={currentType === Filters.film} onChange={() => handleTypeChange('Плёночная')} disabled={currentCategory === Filters.videocamera} /><span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot" checked={currentType === Filters.snapshot} onChange={() => handleTypeChange('Моментальная')} disabled={currentCategory === Filters.videocamera} /><span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked={currentType === Filters.collection} onChange={() => handleTypeChange('Коллекционная')} />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" checked={currentLevel === Filters.zero} onChange={() => handleLevelChange('Нулевой')} />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" checked={currentLevel === Filters.nonProfessional} onChange={() => handleLevelChange('Нулевой')} />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" checked={currentLevel === Filters.professional} onChange={() => handleLevelChange('Нулевой')} />
                <span className="custom-checkbox__icon">
                </span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetClick}>Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
