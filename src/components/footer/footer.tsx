import { Link, useLocation } from 'react-router-dom';
import LogoContent from '../logo-content/logo-content';
import { AppRoute } from '../../const';

const LOGO_SIZE = {
  WIDTH: 64,
  HEIGHT: 33,
};

export default function Footer(): JSX.Element {
  const location = useLocation();
  const isMain = location.pathname === String(AppRoute.Root);

  return (
    <footer className="footer container">
      {isMain ? (
        <span className="footer__logo-link footer__logo-link--active">
          <LogoContent className={'header__logo'} logoSize={LOGO_SIZE} />
        </span>
      ) : (
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <LogoContent className={'header__logo'} logoSize={LOGO_SIZE} />
        </Link>
      )}
    </footer>
  );
}
