import type { State } from '../../types/state';

// Extra Offer.
const getExtraOffer = (state: State) => state.extraOffer;
const getExtraOfferErrorMessage = (state: State) =>
  state.extraOfferErrorMessage;
const getIsExtraOfferLoading = (state: State) => state.isExtraOfferLoading;

export { getExtraOffer, getExtraOfferErrorMessage, getIsExtraOfferLoading };
