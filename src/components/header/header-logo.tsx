import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function HeaderLogo(): JSX.Element {
  const location = useLocation();
  const isMain = location.pathname === String(AppRoute.Root);

  const LogoContent = (
    <img
      className="header__logo"
      src="img/logo.svg"
      alt="6 cities logo"
      width="81"
      height="41"
    />
  );

  return (
    <div className="header__left">
      {isMain ? (
        <span className="header__logo-link header__logo-link--active">
          {LogoContent}
        </span>
      ) : (
        <Link className="header__logo-link" to={AppRoute.Root}>
          {LogoContent}
        </Link>
      )}
    </div>
  );
}
