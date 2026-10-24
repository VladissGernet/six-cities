import { useEffect } from 'react';
import {
  fetchComments,
  fetchExtraOfferAction,
  fetchNearbyOffers,
} from '../../store/api-actions';
import type { OfferId } from '../../types/offers';
import type { AppDispatch } from '../../types/state';

/**
 * Запрос на сервер для получения extraOffer.
 * @param offerId - ID оффера, для получения extraOfferData.
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

    const requestExtraOffer = dispatch(fetchExtraOfferAction(offerId));
    const requestNearbyOffers = dispatch(fetchNearbyOffers(offerId));
    const requestComments = dispatch(fetchComments(offerId));

    return () => {
      requestExtraOffer.abort();
      requestNearbyOffers.abort();
      requestComments.abort();
    };
  }, [offerId, dispatch, isSelectedOffer]);
};

export { useOfferRequest };
