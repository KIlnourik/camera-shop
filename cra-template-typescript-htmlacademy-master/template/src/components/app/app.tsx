import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import CatalogPage from '../../pages/catalog-page';
import ProductPage from '../../pages/product-page';
import BasketPage from '../../pages/basket-page';
import Layout from '../layout/layout';
import ProductParametersTab from '../product-parameters-tab/product-parameters-tab';
import ProductDescTab from '../product-desc-tab/product-desc-tab';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Layout />}>
          <Route path={AppRoute.Pages} element={<CatalogPage />} />
          <Route path={AppRoute.Product} element={<ProductPage />} >
            <Route path={AppRoute.Parameters} element={<ProductParametersTab />} />
            <Route path={AppRoute.Description} element={<ProductDescTab />} />
          </Route>
          <Route path={AppRoute.Basket} element={<BasketPage />} />
        </Route>
      </Routes>
    </HistoryRouter>

  );
}

export default App;
