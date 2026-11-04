import type { State } from '../../types/state';

// TODO, переместить в соответсвующие файлы

const getUserAccountData = (state: State) => state.userAccountData;
const getAuthenticationStatus = (state: State) => state.authenticationStatus;
const getActiveMapMarkerId = (state: State) => state.activeMapMarkerId;

// Offers.
const getOffers = (state: State) => state.offers;
const getGroupedOffers = (state: State) => state.groupedOffers;
const getGroupedFavoriteOffers = (state: State) => state.groupedFavoriteOffers;
const getIsOffersDataLoading = (state: State) => state.isOffersDataLoading;
const getOffersErrorMessage = (state: State) => state.offersErrorMessage;
const getCity = (state: State) => state.city;

export {
  getCity,
  getGroupedOffers,
  getUserAccountData,
  getOffers,
  getAuthenticationStatus,
  getGroupedFavoriteOffers,
  getActiveMapMarkerId,
  getIsOffersDataLoading,
  getOffersErrorMessage,
};
