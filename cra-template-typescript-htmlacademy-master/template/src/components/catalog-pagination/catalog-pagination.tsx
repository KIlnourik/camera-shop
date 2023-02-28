import { Link } from 'react-router-dom';
import { AppRoute, MAX_CARDS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/data-process/selector';

type Props = {
  handlePageButtonClick(currentPage: number, page: number): void;
  handleBackButtonClick(currentPage: number): void;
  handleNextButtonClick(currentPage: number): void;
  chosenPage: number;
};

function CatalogPagination({ handlePageButtonClick, handleBackButtonClick, handleNextButtonClick, chosenPage }: Props): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const summaryPages = Math.ceil(cameras.length / MAX_CARDS_PER_PAGE);
  const pagesList = Array.from({ length: summaryPages }, (v, k) => k);
  const currentPage = chosenPage;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
          <li className="pagination__item">
            <Link
              onClick={() => handleBackButtonClick(currentPage)}
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/page_${currentPage - 1}`}
            >Назад
            </Link>
          </li>}
        {pagesList.map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              onClick={() => handlePageButtonClick(currentPage, page + 1)}
              className={`pagination__link ${(currentPage === (page + 1)) ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Catalog}/page_${page + 1}`}
              data-testid="page"
            >{page + 1}
            </Link>
          </li>
        ))}
        {currentPage !== summaryPages &&
          <li className="pagination__item">
            <Link
              onClick={() => handleNextButtonClick(currentPage)}
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/page_${currentPage + 1}`}
            >Далее
            </Link>
          </li>
        }
      </ul>
    </div >
  );
}

export default CatalogPagination;
