// General.
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getGroupedOffers,
  getOffers,
} from '../../store/offers/offers-selectors';
import { fetchExtraOfferAction } from '../../store/api-actions';

// Components
import Gallery from '../../components/gallery/gallery';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import OffersMap from '../../components/offers-map/offers-map';
import Places from '../../components/places/places';
import Container from '../../components/container/container';

// This folder.
import OfferHost from './offer-host';
import OfferInside from './offer-inside';

// Pages.
import NotFoundPage from '../not-found-page/not-found-page';

// Utils.
import { capitalizeFirstLetter } from '../../utils/utils';
import {
  getOffersByCity,
  getNearOffersWithRestriction,
} from '../../utils/offers';

// Styles
import styles from './offer.module.css';
import type { OfferId } from '../../types/offers';

export default function Offer(): JSX.Element {
  const { id } = useParams();
  const offers = useAppSelector(getOffers);
  const groupedOffers = useAppSelector(getGroupedOffers);
  const dispatch = useAppDispatch();
  // TODO, осатновился на добавлении
  // useAppSelector
  // который будет считывать isExtraOfferLoading
  // Возможно проверку id придется вынести в fetchOfferAction.pending
  // Описать в reducer состояния pending,fullfiled и rejected.
  const offerData = dispatch(fetchExtraOfferAction(id as OfferId));
  console.log(offerData);
  // https://www.perplexity.ai/search/5b402a25-c080-48b2-996d-521889cc80ad

  if (!id) {
    return <NotFoundPage />;
  }

  const selectedOffer = offers.find((item) => item.id === id);
  if (!selectedOffer) {
    return <NotFoundPage />;
  }

  const { title, isPremium, rating, type, price, city, location } =
    selectedOffer;

  // Подготовка данных для рендера городов поблизости.
  const groupedOffersByCity = getOffersByCity(city.name, groupedOffers);

  const nearOffers = getNearOffersWithRestriction(
    groupedOffersByCity.offerPlacesByCity,
    id,
  );

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
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="offer">
        <Container className="offer__gallery-container container">
          <Gallery />
        </Container>
        <Container className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use href="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <Rating
              rating={rating}
              rootClassName={'offer__rating'}
              starsWrapperClassName={'offer__stars'}
              valueClassName={'offer__rating-value'}
              showValue
            />
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizeFirstLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {/* TODO, Исправить на реальное, сейчас mock данные */}3
                Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                {/* TODO, Исправить на реальное, сейчас mock данные */}
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferInside />
            <OfferHost />
            <Reviews />
          </div>
        </Container>
        <Container>
          <OffersMap
            rootClassName="offer__map"
            offers={nearOffers}
            selectedMarkerLocation={location}
          />
        </Container>
      </section>
      <Container className={cn('container', styles['offer__places-container'])}>
        {/*
        проблеммы со скролл
        https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/3/item/18
        */}
        <Places
          rootClassName={cn('near-places', styles['offer__places-content'])}
          title="Other places in the neighbourhood"
          titleClassName="near-places__title"
          groupedOffersByCity={nearOffers}
        />
      </Container>
    </>
  );
}
