import Banner from '../components/banner/banner';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import CatalogCards from '../components/catalog-cards/catalog-cards';
import CatalogFilter from '../components/catalog-filter/catalog-filter';
import CatalogPagination from '../components/catalog-pagination/catalog-pagination';
import CatalogSortForm from '../components/catalog-sort-form/catalog-sort-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchCamerasAction, fetchPromoAction } from '../store/api-actions';
import { MAX_CARDS_PER_PAGE } from '../const';
import { getCameras } from '../store/data-process/selector';

function CatalogPage(): JSX.Element {
  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  });

  const dispatch = useAppDispatch();

  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageButtonClick = (currentPage: number, page: number) => {
    (currentPage !== page)
      ? setOffset((page - 1) * MAX_CARDS_PER_PAGE)
      : setOffset(offset);

  };

  const handleBackButtonClick = (currentPage: number) => {
    setOffset((currentPage - 2) * MAX_CARDS_PER_PAGE);
  };

  const handleNextButtonClick = (currentPage: number) => {
    setOffset(currentPage * MAX_CARDS_PER_PAGE);
  };

  console.log('Офсет', offset);
  console.log('Сумма', offset + MAX_CARDS_PER_PAGE);

  return (
    <main>
      <Banner />
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogFilter />
              <div className="catalog__content">
                <CatalogSortForm />
                <CatalogCards offset={offset} />
                <CatalogPagination
                  handlePageButtonClick={handlePageButtonClick}
                  handleBackButtonClick={handleBackButtonClick}
                  handleNextButtonClick={handleNextButtonClick}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
