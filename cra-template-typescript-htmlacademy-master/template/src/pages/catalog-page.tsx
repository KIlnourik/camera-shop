import Banner from '../components/banner/banner';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import CatalogCards from '../components/catalog-cards/catalog-cards';
import CatalogFilter from '../components/catalog-filter/catalog-filter';
import CatalogPagination from '../components/catalog-pagination/catalog-pagination';
import CatalogSortForm from '../components/catalog-sort-form/catalog-sort-form';
import { useAppDispatch } from '../hooks';
import { useEffect } from 'react';
import { fetchCamerasAction } from '../store/api-actions';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
  });

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
                <CatalogCards />
                <CatalogPagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
