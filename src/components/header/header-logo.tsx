import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import LogoContent from '../logo-content/logo-content';

const LOGO_SIZE = {
  WIDTH: 81,
  HEIGHT: 41,
};

export default function HeaderLogo(): JSX.Element {
  const location = useLocation();
  const isMain = location.pathname === String(AppRoute.Root);

  return (
    <div className="header__left">
      {isMain ? (
        <span className="header__logo-link header__logo-link--active">
          <LogoContent className={'header__logo'} logoSize={LOGO_SIZE} />
        </span>
      ) : (
        <Link className="header__logo-link" to={AppRoute.Root}>
          <LogoContent className={'header__logo'} logoSize={LOGO_SIZE} />
        </Link>
      )}
    </div>
  );
}
