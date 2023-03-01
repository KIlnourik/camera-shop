import { Link } from 'react-router-dom';

function SocialList(): JSX.Element {
  return (
    <ul className="social">
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу вконтакте">
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-vk"></use>
          </svg>
        </Link>
      </li>
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу pinterest">
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-pinterest"></use>
          </svg>
        </Link>
      </li>
      <li className="social__item">
        <Link className="link" to="#" aria-label="Переход на страницу reddit">
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-reddit"></use>
          </svg>
        </Link>
      </li>
    </ul>
  );
}

export default SocialList;
