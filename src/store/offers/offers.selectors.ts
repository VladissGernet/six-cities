import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const getActiveMapMarkerId = (state: State) =>
  state[NameSpace.Offers].activeMapMarkerId;
const getCity = (state: State) => state[NameSpace.Offers].city;

const getOffers = (state: State) => state[NameSpace.Offers].offers;
const getGroupedOffers = (state: State) =>
  state[NameSpace.Offers].groupedOffers;
const getGroupedFavoriteOffers = (state: State) =>
  state[NameSpace.Offers].groupedFavoriteOffers;
const getIsOffersDataLoading = (state: State) =>
  state[NameSpace.Offers].isOffersDataLoading;
const getOffersErrorMessage = (state: State) =>
  state[NameSpace.Offers].offersErrorMessage;

export {
  getCity,
  getActiveMapMarkerId,
  getGroupedOffers,
  getOffers,
  getGroupedFavoriteOffers,
  getIsOffersDataLoading,
  getOffersErrorMessage,
};
