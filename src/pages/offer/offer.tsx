// General.
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useOfferRequest } from '../../hooks/offer/use-offer-request';

// Selectors.
import { getOffers } from '../../store/selectors/offers';
import {
  getExtraOfferErrorMessage,
  getIsExtraOfferLoading,
} from '../../store/selectors/offer';

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
  const extraOfferErrorMessage = useAppSelector(getExtraOfferErrorMessage);
  const isExtraOfferLoading = useAppSelector(getIsExtraOfferLoading);

  const dispatch = useAppDispatch();

  const isSelectedOffer = offers.some((item) => item.id === offerId);

  // Запрос на сервер.
  useOfferRequest(offerId, dispatch, isSelectedOffer);
  if (!isSelectedOffer) {
    return <NotFoundPage />;
  }

  if (isExtraOfferLoading) {
    return <LoadingScreenContent />;
  }

  if (extraOfferErrorMessage) {
    return (
      <Container>
        <h1>{extraOfferErrorMessage}</h1>
      </Container>
    );
  }

  return <OfferContent />;
}
