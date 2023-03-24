import { useState, useEffect } from 'react';
import { Sorts } from '../../const';
// import { useAppDispatch } from '../../hooks';
// import { fetchCamerasAction } from '../../store/api-actions';

type Props = {
  sortQuery: string;
  orderQuery: string;
  setSearchParams(params: {
    sort?: string;
    order: string;
  }): void;
};

function CatalogSortForm({ sortQuery, orderQuery, setSearchParams }: Props): JSX.Element {
  // const dispatch = useAppDispatch();
  const [currentSort, setCurrentSort] = useState(sortQuery);
  const [currentOrder, setCurrentOrder] = useState(orderQuery);

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    // dispatch(fetchCamerasAction({ sort: currentSort, order: currentOrder }));
  };

  const handleOrderChange = (order: string) => {
    if (!currentSort.length) {
      setCurrentSort('price');
    }
    setCurrentOrder(order);
    // dispatch(fetchCamerasAction({ sort: currentSort, order: currentOrder }));
  };

  useEffect(() => {
    if (currentSort.length && currentOrder.length) {
      setSearchParams({ sort: currentSort, order: currentOrder });
    }
  }, [setSearchParams, currentOrder, currentSort]);

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
                checked={currentSort === Sorts.Price}
                onChange={() => handleSortChange('price')}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio"
                id="sortPopular"
                name="sort"
                checked={currentSort === Sorts.Rating}
                onChange={() => handleSortChange('rating')}
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
                checked={currentOrder === Sorts.ASC}
                onChange={() => handleOrderChange('asc')}
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
                checked={currentOrder === Sorts.DESC}
                onChange={() => handleOrderChange('desc')}
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
