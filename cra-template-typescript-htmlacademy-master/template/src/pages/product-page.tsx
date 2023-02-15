import ProductInfo from "../components/product-info/product-info";
import ProductReview from "../components/product-review/product-review";
import SimilarProducts from "../components/similar-products/similar-products";

function ProductPage(): JSX.Element {
  return (
    <>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item"><a className="breadcrumbs__link" href="index.html">Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg></a>
                </li>
                <li className="breadcrumbs__item"><a className="breadcrumbs__link" href="catalog.html">Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg></a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Ретрокамера «Das
                  Auge IV»</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <ProductInfo />
          </div>
          <div className="page-content__section">
            <SimilarProducts />
          </div>
          <div className="page-content__section">
            <ProductReview />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>

  );
}

export default ProductPage;
