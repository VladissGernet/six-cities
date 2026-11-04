import type { State } from '../../types/state';

const getOffers = (state: State) => state.offers;
const getGroupedOffers = (state: State) => state.groupedOffers;
const getGroupedFavoriteOffers = (state: State) => state.groupedFavoriteOffers;
const getIsOffersDataLoading = (state: State) => state.isOffersDataLoading;
const getOffersErrorMessage = (state: State) => state.offersErrorMessage;

export {
  getGroupedOffers,
  getOffers,
  getGroupedFavoriteOffers,
  getIsOffersDataLoading,
  getOffersErrorMessage,
};
