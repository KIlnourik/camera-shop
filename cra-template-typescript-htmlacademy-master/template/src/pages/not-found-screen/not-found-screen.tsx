import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import '../not-found-screen/not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page-wrapper">
      <img className="" src="/img/content/gif/travolta-gif.gif" alt="Растерянный Траволта" />
      <div className="text-wrapper">
        <h1 className="title title--h1">
          <b style={{ fontSize: '1.5em' }}>Ошибка&nbsp;404!</b ><br />
          <b>Такой страницы не&nbsp;существует.<br />Что ж...</b>
        </h1>
        <Link to={AppRoute.Catalog} className="btn btn--purple">Вернуться к Каталог</Link>
      </div>
    </div >
  );
}

export default NotFoundScreen;