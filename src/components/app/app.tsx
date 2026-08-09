import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';

import MainScreen from '../../pages/main-screen/main-screen';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

import PrivateRoute from '../private-route/private-route';

import { groupOffers } from './app.helper';

type AppProps = {
  offers: Offers;
};

// TODO, использовать NavLink для лого, чтобы на гл странице деактивировать его.
// TODO, также возможно нужно разобраться с helmet для изменения title у вкладки.
/*
  TODO
  https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/3/item/18

  1. Проверить работу вложженых рутов на наличие ошибки в виде пустой страницы из стати
  Страница 404
  https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/3/item/18#:~:text=%D0%B1%D0%B5%D0%B7%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%80%D0%BE%D1%83%D1%82%D0%B8%D0%BD%D0%B3%D0%B0.-,%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0%20404,-%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B8%20%D0%B8%D0%BD%D0%BE%D0%B3%D0%B4%D0%B0%20%D0%BF%D0%BE

  2. Проверить проблему со скроллом "Проблемы со scroll"
  https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/3/item/18#:~:text=%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B0%20%C2%AB%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0%20404%C2%BB.-,%D0%9F%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B%20%D1%81%D0%BE%C2%A0scroll,-%D0%92%D0%B5%D0%B1%20%D1%81%C2%A0%D0%BF%D0%B5%D1%80%D0%B2%D1%8B%D1%85
*/

export default function App({ offers }: AppProps): JSX.Element {
  const groupedOffers = groupOffers(offers);

  // TODO, попробовать реализовать общий layout с page,header и т.п.
  // TODO, рассмотреть необходимость оборачивания кода нижа в <React.StrictMode>
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen groupedOffers={groupedOffers} offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites groupedOffers={groupedOffers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer offers={offers} groupedOffers={groupedOffers} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
