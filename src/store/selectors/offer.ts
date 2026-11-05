import type { State } from '../../types/state';

const getExtraOffer = (state: State) => state.extraOffer;
const getExtraOfferErrorMessage = (state: State) =>
  state.extraOfferErrorMessage;
const getIsExtraOfferLoading = (state: State) => state.isExtraOfferLoading;

const getNearOffers = (state: State) => state.nearbyOffers;
const getIsNearbyLoading = (state: State) => state.isNearbyLoading;
const getNearbyErrorMessage = (state: State) => state.nearbyErrorMessage;

const getComments = (state: State) => state.extraOfferComments;

export {
  getExtraOffer,
  getExtraOfferErrorMessage,
  getIsExtraOfferLoading,
  getNearOffers,
  getComments,
  getIsNearbyLoading,
  getNearbyErrorMessage,
};
