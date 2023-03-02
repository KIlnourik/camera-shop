import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getPromo, getPromoLoadingStatus } from '../../store/data-process/selector';
import Spinner from '../spinner/spinner';


function Banner(): JSX.Element {

  const promo = useAppSelector(getPromo);
  const isPromoLoading = useAppSelector(getPromoLoadingStatus);

  if (isPromoLoading || !promo) {
    return <Spinner />;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`/${promo.previewImgWebp}, /${promo.previewImgWebp2x} 2x`} />
        <img src={`/${promo.previewImg}`} srcSet={`/${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`/cameras/${promo.id}/${AppRoute.Parameters}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
