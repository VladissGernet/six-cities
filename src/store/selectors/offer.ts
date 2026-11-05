import type { State } from '../../types/state';

const getExtraOffer = (state: State) => state.extraOffer;
const getExtraOfferErrorMessage = (state: State) =>
  state.extraOfferErrorMessage;
const getIsExtraOfferLoading = (state: State) => state.isExtraOfferLoading;

const getNearOffers = (state: State) => state.nearbyOffers;

const getComments = (state: State) => state.extraOfferComments;

export {
  getExtraOffer,
  getExtraOfferErrorMessage,
  getIsExtraOfferLoading,
  getNearOffers,
  getComments,
};
