import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function FooterNavList(): JSX.Element {
  return (
    <ul className="footer__nav">
      <li className="footer__nav-item">
        <p className="footer__title">Навигация</p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link className="link" to={AppRoute.Catalog}>Каталог
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>Гарантии
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>Доставка
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>О компании
            </Link>
          </li>
        </ul>
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Ресурсы</p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link className="link" to=''>Курсы операторов
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>Блог
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>Сообщество
            </Link>
          </li>
        </ul>
      </li>
      <li className="footer__nav-item">
        <p className="footer__title">Поддержка</p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link className="link" to=''>FAQ
            </Link>
          </li>
          <li className="footer__item">
            <Link className="link" to=''>Задать вопрос
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default FooterNavList;
