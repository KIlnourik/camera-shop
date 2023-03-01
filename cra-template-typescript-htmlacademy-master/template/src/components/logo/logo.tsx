import { Link } from 'react-router-dom';

type Props = {
  isFooter?: boolean;
}

function Logo({isFooter}: Props): JSX.Element {
  return (
    <Link className="header__logo" to="" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={isFooter ? '#icon-logo-mono' : '#icon-logo'}></use>
      </svg>
    </Link>
  );
}

export default Logo;
