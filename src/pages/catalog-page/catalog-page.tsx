import { useState, KeyboardEvent, useEffect } from 'react';
import { DEBOUNCE_TIMEOUT, MAX_CARDS_PER_PAGE, Sorts, STATE_ONE, STATE_ZERO, OFFSET_ONE, OFFSET_TWO, INDEX_OF_SPLITTED_URL, Filters, AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCameras, getAllCameras } from '../../store/camera-process/selector';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getMinPrice, getMaxPrice, getFilterItems } from '../../utils/utils';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogPagination from '../../components/catalog-pagination/catalog-pagination';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import AddItemPopup from '../../components/add-item-popup/add-item-popup';
import NotFoundPage from '../not-found-page/not-found-page';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const navigate = useNavigate();
  const { page } = useParams();
  const [summaryPages, setSummaryPages] = useState(STATE_ZERO);
  const [chosenPage, setChosenPage] = useState(STATE_ONE);
  const [offset, setOffset] = useState(STATE_ZERO);
  const [isActivePopup, setActivePopup] = useState(false);
  const [chosenCamera, setChosenCamera] = useState<Camera | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [price, setPrice] = useState(searchParams.get('price_gte') || '');
  const [priceUp, setPriceUp] = useState(searchParams.get('price_lte') || '');
  const allCameras = useAppSelector(getAllCameras);
  const [minPrice, setMinPrice] = useState(STATE_ZERO);
  const [maxPrice, setMaxPrice] = useState(STATE_ZERO);
  const [types, setTypes] = useState(searchParams.getAll('type') || []);
  const [levels, setLevels] = useState(searchParams.getAll('level') || []);
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [order, setOrder] = useState(searchParams.get('order') || '');

  useEffect(() => {
    const queryParams = new URLSearchParams({});
    setMinPrice(getMinPrice(allCameras));
    setMaxPrice(getMaxPrice(allCameras));

    if (sort.length && order.length) {
      queryParams.set('_sort', sort);
      queryParams.set('_order', order);
    }

    if (price.length) {
      queryParams.append('price_gte', price);
    }

    if (priceUp.length) {
      queryParams.append('price_lte', priceUp);
    }
    if (category.length) {
      queryParams.append('category', category);
    }

    if (types.length) {
      types.map((type) => queryParams.append('type', type));
    }

    if (levels.length) {
      levels.map((level) => queryParams.append('level', level));
    }
    setSearchParams(queryParams);

    if (queryParams) {
      dispatch(fetchCamerasAction(queryParams));
    }

    setSummaryPages(Math.ceil(cameras.length / MAX_CARDS_PER_PAGE));

    if (page && Number(page?.split('_')[INDEX_OF_SPLITTED_URL]) <= summaryPages) {
      setChosenPage(Number(page?.split('_')[INDEX_OF_SPLITTED_URL]));
      setOffset((Number(page?.split('_')[INDEX_OF_SPLITTED_URL]) - OFFSET_ONE) * MAX_CARDS_PER_PAGE);
    }

  }, [dispatch, page, cameras.length, summaryPages, setSearchParams, category, allCameras, price, priceUp, types, levels, sort, order]);

  const handlePageButtonClick = (currentPage: number, selectedPage: number) => {
    if (currentPage !== selectedPage) {
      setOffset((selectedPage - OFFSET_ONE) * MAX_CARDS_PER_PAGE);
      setChosenPage(selectedPage);
    } else {
      setOffset(offset);
    }
  };

  const handleBackButtonClick = (currentPage: number) => {
    setOffset((currentPage - OFFSET_TWO) * MAX_CARDS_PER_PAGE);
    setChosenPage(currentPage - OFFSET_ONE);
  };

  const handleNextButtonClick = (currentPage: number) => {
    setOffset(currentPage * MAX_CARDS_PER_PAGE);
    setChosenPage(currentPage + OFFSET_ONE);
  };

  const handleBuyButtonClick = (camera: Camera) => {
    setActivePopup(!isActivePopup);
    setChosenCamera(camera);
  };

  const handleClosePopup = () => {
    setActivePopup(!isActivePopup);
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setActivePopup(!isActivePopup);
    }
  };

  if (Number(page?.split('_')[INDEX_OF_SPLITTED_URL]) > summaryPages) {
    return <NotFoundPage />;
  }

  const handleSortChange = (chosenSort: string) => {
    if (!order.length) {
      setOrder(Sorts.ASC);
    }
    setSort(chosenSort);
  };

  const handleOrderChange = (chosenOrder: string) => {
    if (!sort.length) {
      setSort(Sorts.Price);
    }
    setOrder(chosenOrder);
  };

  const handlePriceChange = (value: string | undefined) => {
    setTimeout(() => {
      value ?
        setPrice(value) :
        setPrice('');

      if (value && Number(value) < minPrice) {
        setPrice(minPrice.toString());
      }
      if (value && Number(value) > maxPrice) {
        setPrice(maxPrice.toString());
      }
      navigate(`${AppRoute.Catalog}page_1`);
    }, DEBOUNCE_TIMEOUT);
  };

  const handlePriceUpChange = (value: string | undefined) => {
    setTimeout(() => {
      value ?
        setPriceUp(value) :
        setPriceUp('');

      if (value && Number(value) > maxPrice) {
        setPriceUp(maxPrice.toString());
      }

      if (value && Number(value) < minPrice) {
        setPriceUp(minPrice.toString());
      }

      if (value && Number(value) < Number(price)) {
        setPriceUp(price);
      }
      navigate(`${AppRoute.Catalog}page_1`);
    }, DEBOUNCE_TIMEOUT);
  };

  const handleCategoryChange = (chosenCategory: string) => {
    chosenCategory !== category ?
      setCategory(chosenCategory) :
      setCategory('');

    if (chosenCategory === Filters.videocamera) {
      setTypes(types.filter((type) => type !== Filters.snapshot && type !== Filters.film));
    }
    navigate(`${AppRoute.Catalog}page_1`);
  };

  const handleTypesChange = (type: string) => {
    setTypes(getFilterItems(type, types));
    navigate(`${AppRoute.Catalog}page_1`);
  };

  const handleLevelsChange = (level: string) => {
    setLevels(getFilterItems(level, levels));
    navigate(`${AppRoute.Catalog}page_1`);
  };

  const handleResetClick = () => {
    setCategory('');
    setTypes([]);
    setLevels([]);
    setPrice('');
    setPriceUp('');
  };

  return (
    <main>
      <Banner />
      <div className="page-content" onKeyDown={handleEscKeydown}>
        {<Breadcrumbs />}
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogFilter
                category={category}
                minPrice={minPrice.toString()}
                maxPrice={maxPrice.toString()}
                types={types}
                levels={levels}
                handleCategoryChange={handleCategoryChange}
                handlePriceChange={handlePriceChange}
                handlePriceUpChange={handlePriceUpChange}
                handleTypesChange={handleTypesChange}
                handleLevelsChange={handleLevelsChange}
                handleResetClick={handleResetClick}
              />
              <div className="catalog__content">
                <CatalogSortForm
                  sort={sort}
                  order={order}
                  handleSortChange={handleSortChange}
                  handleOrderChange={handleOrderChange}
                />
                {cameras.length ?
                  <CatalogCards offset={offset} handleBuyButtonClick={handleBuyButtonClick} /> :
                  <>
                    <br /><h3 className="title title--h3">По Вашему запросу ничего не найдено</h3>
                  </>}
                {summaryPages > 1 &&
                  <CatalogPagination
                    handlePageButtonClick={handlePageButtonClick}
                    handleBackButtonClick={handleBackButtonClick}
                    handleNextButtonClick={handleNextButtonClick}
                    summaryPages={summaryPages}
                    chosenPage={chosenPage}
                  />}
              </div>
            </div>
          </div>
        </section>
      </div>
      {isActivePopup &&
        <AddItemPopup
          camera={chosenCamera}
          handleClosePopup={handleClosePopup}
          handleEscKeydown={handleEscKeydown}
        />}
    </main>
  );
}

export default CatalogPage;
