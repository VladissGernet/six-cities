// General.
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getExtraOffer,
  getExtraOfferErrorMessage,
  getOffers,
} from '../../store/offers/offers-selectors';
import { useOfferRequest } from '../../hooks/offer/use-offer-request';

// Components.
import LoadingScreenContent from '../loading-screen/loading-screen-content';
import Container from '../../components/container/container';

// Pages.
import NotFoundPage from '../not-found-page/not-found-page';

// This folder.
import OfferContent from './offer-content';

// Types.
import type { OfferId } from '../../types/offers';

export default function Offer(): JSX.Element {
  const { id: offerId } = useParams<{ id: OfferId }>();

  const offers = useAppSelector(getOffers);
  const extraOffer = useAppSelector(getExtraOffer);
  const extraOfferErrorMessage = useAppSelector(getExtraOfferErrorMessage);
  // TODO, осталось получить данные nearby и comments через useAppSelector.

  const dispatch = useAppDispatch();

  const isSelectedOffer = offers.some((item) => item.id === offerId);

  // Запрос на сервер.
  useOfferRequest(offerId, dispatch, isSelectedOffer);

  if (!offerId) {
    return <NotFoundPage />;
  }

  if (!isSelectedOffer) {
    return <NotFoundPage />;
  }

  if (extraOffer) {
    return <OfferContent offerId={offerId} />;
  }

  if (extraOfferErrorMessage) {
    return (
      <Container>
        <h1>{extraOfferErrorMessage}</h1>
      </Container>
    );
  }
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
  return <LoadingScreenContent />;
}
