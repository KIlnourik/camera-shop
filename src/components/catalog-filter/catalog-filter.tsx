import CatalogFilterCategory from '../catalog-filter-category/catalog-filter-category';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';
import CatalogFilterLevel from '../catalog-filter-level/catalog-filter-level';

type Props = {
  category: string;
  minPrice: string;
  maxPrice: string;
  types: string[];
  levels: string[];
  handleCategoryChange(chosenCategory: string): void;
  handlePriceChange(inputValue: string | undefined): void;
  handlePriceUpChange(inputValue: string | undefined): void;
  handleTypesChange(type: string): void;
  handleLevelsChange(type: string): void;
  handleResetClick(): void;
};

function CatalogFilter({
  category,
  minPrice,
  maxPrice,
  types,
  levels,
  handleCategoryChange,
  handlePriceChange,
  handlePriceUpChange,
  handleTypesChange,
  handleLevelsChange,
  handleResetClick
}: Props): JSX.Element {

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" >
          <h2 className="visually-hidden">Фильтр</h2>
          <CatalogFilterPrice
            minPrice={minPrice}
            maxPrice={maxPrice}
            handlePriceChange={handlePriceChange}
            handlePriceUpChange={handlePriceUpChange}
          />
          <CatalogFilterCategory
            category={category}
            handleCategoryChange={handleCategoryChange}
          />
          <CatalogFilterType
            category={category}
            types={types}
            handleTypesChange={handleTypesChange}
          />
          <CatalogFilterLevel
            levels={levels}
            handleLevelsChange={handleLevelsChange}
          />
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetClick}
          >Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
