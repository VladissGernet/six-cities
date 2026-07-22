import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type HeaderLogoProps = {
  isMainScreen?: boolean;
};

export default function HeaderLogo({
  isMainScreen,
}: HeaderLogoProps): JSX.Element {
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
      {isMainScreen ? (
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
