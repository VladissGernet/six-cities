// General.
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getGroupedOffers,
  getOffers,
} from '../../store/offers/offers-selectors';
import { fetchExtraOfferAction } from '../../store/api-actions';

// Components.
import LoadingScreenContent from '../loading-screen/loading-screen-content';

// Pages.
import NotFoundPage from '../not-found-page/not-found-page';

// This folder.
import OfferContent from './offer-content';

// Types.
import type { OfferId } from '../../types/offers';

export default function Offer(): JSX.Element {
  const { id: offerId } = useParams<{ id: OfferId }>();
  const offers = useAppSelector(getOffers);
  const groupedOffers = useAppSelector(getGroupedOffers);
  const dispatch = useAppDispatch();

  // Запрос на сервер для получения extraOffer.
  useEffect(() => {
    if (!offerId) {
      return;
    }
    const isSelectedOffer = offers.some((item) => item.id === offerId);
    if (!isSelectedOffer) {
      return;
    }

    const request = dispatch(fetchExtraOfferAction(offerId));
    return () => {
      request.abort();
    };
  }, [offerId, dispatch, offers]);

  if (!offerId) {
    return <NotFoundPage />;
  }

  const selectedOffer = offers.find((item) => item.id === offerId);
  // TODO, заменить на .some
  if (!selectedOffer) {
    return <NotFoundPage />;
  }

  // TODO, когда буду получать данные с сервера реализовать проверку 404, т.е. если ввожу
  // неверный OfferId и выпадает 404 ошибка, то нет смысла делать еще дополнительные
  // запросы на сервер.
  // TODO, не забыть блокировать на момент оправки отзыва, чтобы не отправилось на сервер дважды.
  // TODO, проверить, как отрабатывает ошибка при попытке отправить отзыв при отсутствии инета.

  /*
    Перед взаимодействием с UI , например, очисткой формы при отправке данных на сервер, нужно убедиться,
    а был ли успешно доставлен запрос или отобразить ошибку и оставить данные для повторной отправки.
    Желательно сделать валидацию заранее. Например, можно использовать встроенные возможности валидации
    у HTML элементов.
    Валидацию можно прокидывать в toast. Как вариант, описать ошибки , которые будет перехватывать
    interceptor в api.ts.
    Делать проверки с pattern и c toast

    На странице логина должна быть проверка успешной авторизации, иначе, при ошибке будет не залогиненный
    пользователь перенаправлен на главную. Также и с отправкой отзыва, чтобы при ошибки отправки данных отзыва
    форма не стиралась, отобразила ошибку отправки комментария на сервер и текст отзыва был бы сохранен.
  */
  // return (
  //   <OfferContent
  //     selectedOffer={selectedOffer}
  //     groupedOffers={groupedOffers}
  //     offerId={offerId}
  //   />
  return <LoadingScreenContent />;
}
