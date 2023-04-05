import { Sorts } from '../../const';

type Props = {
  sort: string;
  order: string;
  handleSortChange(sort: string): void;
  handleOrderChange(order: string): void;
};

function CatalogSortForm({ sort, order, handleSortChange, handleOrderChange }: Props): JSX.Element {

  return (
    <div className="catalog-sort">
      <form action="#" >
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio"
                id="sortPrice"
                name="sort"
                checked={sort === Sorts.Price}
                onChange={() => handleSortChange(Sorts.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio"
                id="sortPopular"
                name="sort"
                checked={sort === Sorts.Rating}
                onChange={() => handleSortChange(Sorts.Rating)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={order === Sorts.ASC}
                onChange={() => handleOrderChange(Sorts.ASC)}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={order === Sorts.DESC}
                onChange={() => handleOrderChange(Sorts.DESC)}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSortForm;
