// General.
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useOfferRequest } from '../../hooks/offer/use-offer-request';

// Store.
import {
  getSelectedOfferErrorMessage,
  getIsSelectedOfferLoading,
} from '../../store/selected-offer/selected-offer.selectors';
import { getOffers } from '../../store/offers/offers.selectors';
import { clearSelectedOffer } from '../../store/selected-offer/selected-offer.slice';

// Components.
import LoadingScreenContent from '../loading-screen/loading-screen-content';
import Container from '../../components/container/container';

// Pages.
import NotFoundPage from '../not-found-page/not-found-page';

// This folder.
import OfferContent from './selected-offer-content';

// Types.
import type { OfferId } from '../../types/offers';

export default function SelectedOffer(): JSX.Element {
  const { id: offerId } = useParams<{ id: OfferId }>();

  const offers = useAppSelector(getOffers);
  const selectedOfferErrorMessage = useAppSelector(
    getSelectedOfferErrorMessage,
  );
  const isSelectedOfferLoading = useAppSelector(getIsSelectedOfferLoading);

  const dispatch = useAppDispatch();

  // Очистка SelectedOffer в store после размонтирования страницы.
  useEffect(
    () => () => {
      dispatch(clearSelectedOffer());
    },
    [dispatch],
  );

  const isSelectedOffer = offers.some((item) => item.id === offerId);

  // Запрос на сервер.
  useOfferRequest(offerId, dispatch, isSelectedOffer);
  if (!isSelectedOffer) {
    return <NotFoundPage />;
  }

  if (isSelectedOfferLoading) {
    return <LoadingScreenContent />;
  }

  if (selectedOfferErrorMessage) {
    return (
      <Container>
        <h1>{selectedOfferErrorMessage}</h1>
      </Container>
    );
  }

  return <OfferContent />;
}
