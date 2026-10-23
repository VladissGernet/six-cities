import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import Offer from '../../pages/offer/offer';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import AuthScreen from '../../pages/auth-screen/auth-screen';

import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

import AppLayout from '../../layout/app-layout';
import PageWithoutLayout from '../../layout/page-without-footer-layout';
import PageWithFooterLayout from '../../layout/page-with-footer-layout';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={AppRoute.Login} element={<AuthScreen />} />

            <Route element={<PageWithoutLayout />}>
              <Route path={AppRoute.Root} element={<MainScreen />} />
              <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
            </Route>

            <Route element={<PageWithFooterLayout />}>
              <Route path={AppRoute.Favorites} element={<PrivateRoute />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
