import { useEffect } from 'react';
import { fetchExtraOfferAction } from '../../store/api-actions';
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
    const request = dispatch(fetchExtraOfferAction(offerId));
    return () => {
      request.abort();
    };
  }, [offerId, dispatch, isSelectedOffer]);
};

export { useOfferRequest };
