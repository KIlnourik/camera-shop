
type Props = {
  isFooter?: boolean;
}

function Logo({isFooter}: Props): JSX.Element {
  return (
    <a className="header__logo" href="index.html" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={isFooter ? '#icon-logo-mono' : '#icon-logo'}></use>
      </svg>
    </a>
  );
}

export default Logo;
