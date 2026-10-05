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

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={AppRoute.Root} element={<MainScreen />} />
            <Route path={AppRoute.Favorites} element={<PrivateRoute />} />
            <Route path={AppRoute.Login} element={<AuthScreen />} />
            <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
