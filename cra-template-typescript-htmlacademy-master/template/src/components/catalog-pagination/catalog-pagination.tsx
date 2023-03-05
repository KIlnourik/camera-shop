import { Link } from 'react-router-dom';

type Props = {
  handlePageButtonClick(currentPage: number, page: number): void;
  handleBackButtonClick(currentPage: number): void;
  handleNextButtonClick(currentPage: number): void;
  chosenPage: number;
  summaryPages: number;
};

function CatalogPagination({ handlePageButtonClick, handleBackButtonClick, handleNextButtonClick, summaryPages, chosenPage }: Props): JSX.Element {

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
              to={`/page_${currentPage - 1}`}
            >Назад
            </Link>
          </li>}
        {pagesList.map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              onClick={() => handlePageButtonClick(currentPage, page + 1)}
              className={`pagination__link ${(currentPage === (page + 1)) ? 'pagination__link--active' : ''}`}
              to={`/page_${page + 1}`}
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
              to={`/page_${currentPage + 1}`}
            >Далее
            </Link>
          </li>}
      </ul>
    </div >
  );
}

export default CatalogPagination;
