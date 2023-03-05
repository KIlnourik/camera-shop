import { useState, KeyboardEvent, useEffect } from 'react';
import { MAX_CARDS_PER_PAGE } from '../../const';
import { Camera } from '../../types/camera';
import { useParams } from 'react-router-dom';
import { getCameras } from '../../store/camera-process/selector';
import { useAppSelector } from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogPagination from '../../components/catalog-pagination/catalog-pagination';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import AddItemPopup from '../../components/add-item-popup/add-item-popup';
import NotFoundPage from '../not-found-page/not-found-page';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const { page } = useParams();
  const [summaryPages, setSummaryPages] = useState(0);
  const [chosenPage, setChosenPage] = useState((page && Number(page?.split('_')[1]) <= summaryPages) ? Number(page?.split('_')[1]) : 1);
  const [offset, setOffset] = useState((page && Number(page?.split('_')[1]) <= summaryPages) ? ((Number(page?.split('_')[1]) - 1) * MAX_CARDS_PER_PAGE) : 0);
  const [isActivePopup, setActivePopup] = useState(false);
  const [chosenCamera, setChosenCamera] = useState<Camera | undefined>(undefined);

  useEffect(() => {
    setSummaryPages(Math.ceil(cameras.length / MAX_CARDS_PER_PAGE));
  }, [cameras.length]);

  const handlePageButtonClick = (currentPage: number, selectedPage: number) => {
    if (currentPage !== selectedPage) {
      setOffset((selectedPage - 1) * MAX_CARDS_PER_PAGE);
      setChosenPage(selectedPage);
    } else {
      setOffset(offset);
    }
  };

  const handleBackButtonClick = (currentPage: number) => {
    setOffset((currentPage - 2) * MAX_CARDS_PER_PAGE);
    setChosenPage(currentPage - 1);
  };

  const handleNextButtonClick = (currentPage: number) => {
    setOffset(currentPage * MAX_CARDS_PER_PAGE);
    setChosenPage(currentPage + 1);
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

  if (Number(page?.split('_')[1]) > summaryPages) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Banner />
      <div className="page-content" onKeyDown={handleEscKeydown}>
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogFilter />
              <div className="catalog__content">
                <CatalogSortForm />
                <CatalogCards offset={offset} handleBuyButtonClick={handleBuyButtonClick} />
                <CatalogPagination
                  handlePageButtonClick={handlePageButtonClick}
                  handleBackButtonClick={handleBackButtonClick}
                  handleNextButtonClick={handleNextButtonClick}
                  summaryPages={summaryPages}
                  chosenPage={chosenPage}
                />
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
