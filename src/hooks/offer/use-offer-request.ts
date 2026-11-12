import { useEffect } from 'react';
import {
  fetchComments,
  fetchSelectedOfferAction,
  fetchNearbyOffers,
} from '../../store/api-actions';
import type { OfferId } from '../../types/offers';
import type { AppDispatch } from '../../types/state';

/**
 * Запрос на сервер для получения selectedOffer.
 * @param offerId - ID офера, для получения selectedOffer.
 * @param dispatch - AppDispatch.
 * @param isSelectedOffer - Результат boolean проверки на наличие id
 * offer в базе.
 */
const useOfferRequest = (
  offerId: OfferId | undefined | null,
  dispatch: AppDispatch,
  isSelectedOffer: boolean,
): void => {
  useEffect(() => {
    if (!offerId) {
      return;
    }
    if (!isSelectedOffer) {
      return;
    }

    const requestSelectedOffer = dispatch(fetchSelectedOfferAction(offerId));
    const requestNearbyOffers = dispatch(fetchNearbyOffers(offerId));
    const requestComments = dispatch(fetchComments(offerId));

    return () => {
      requestSelectedOffer.abort();
      requestNearbyOffers.abort();
      requestComments.abort();
    };
  }, [offerId, dispatch, isSelectedOffer]);
};

export { useOfferRequest };
