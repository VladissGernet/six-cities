import type { State } from '../../types/state';

const getCity = (state: State) => state.city;
const getGroupedOffers = (state: State) => state.groupedOffers;
const getUserAccountData = (state: State) => state.userAccountData;
const getOffers = (state: State) => state.offers;
const getAuthenticationStatus = (state: State) => state.authenticationStatus;
const getGroupedFavoriteOffers = (state: State) => state.groupedFavoriteOffers;
const getActiveMapMarkerId = (state: State) => state.activeMapMarkerId;
const getIsOffersDataLoading = (state: State) => state.isOffersDataLoading;

const getExtraOffer = (state: State) => state.extraOffer;
const getExtraOfferErrorMessage = (state: State) =>
  state.extraOfferErrorMessage;

export {
  getCity,
  getGroupedOffers,
  getUserAccountData,
  getOffers,
  getAuthenticationStatus,
  getGroupedFavoriteOffers,
  getActiveMapMarkerId,
  getIsOffersDataLoading,
  getExtraOffer,
  getExtraOfferErrorMessage,
};
