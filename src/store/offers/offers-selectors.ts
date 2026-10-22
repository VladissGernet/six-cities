import type { State } from '../../types/state';

const getCity = (state: State) => state.city;
const getGroupedOffers = (state: State) => state.groupedOffers;
const getUserAccountData = (state: State) => state.userAccountData;
const getOffers = (state: State) => state.offers;
const getAuthenticationStatus = (state: State) => state.authenticationStatus;
const getGroupedFavoirteOffers = (state: State) => state.groupedFavoirteOffers;
const getActiveMapMarkerId = (state: State) => state.activeMapMarkerId;
const getIsOffersDataLoading = (state: State) => state.isOffersDataLoading;

const getExtraOfferData = (state: State) => state.extraOfferData;
const getExtraOfferErrorMessage = (state: State) =>
  state.extraOfferErrorMessage;

export {
  getCity,
  getGroupedOffers,
  getUserAccountData,
  getOffers,
  getAuthenticationStatus,
  getGroupedFavoirteOffers,
  getActiveMapMarkerId,
  getIsOffersDataLoading,
  getExtraOfferData,
  getExtraOfferErrorMessage,
};
