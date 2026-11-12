import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const getSelectedOffer = (state: State) =>
  state[NameSpace.SelectedOffer].selectedOffer;
const getSelectedOfferErrorMessage = (state: State) =>
  state[NameSpace.SelectedOffer].selectedOfferErrorMessage;
const getIsSelectedOfferLoading = (state: State) =>
  state[NameSpace.SelectedOffer].isSelectedOfferLoading;

const getNearOffers = (state: State) =>
  state[NameSpace.SelectedOffer].nearbyOffers;
const getIsNearbyLoading = (state: State) =>
  state[NameSpace.SelectedOffer].isNearbyLoading;
const getNearbyErrorMessage = (state: State) =>
  state[NameSpace.SelectedOffer].nearbyErrorMessage;

const getComments = (state: State) => state[NameSpace.SelectedOffer].comments;
const getIsCommentsLoading = (state: State) =>
  state[NameSpace.SelectedOffer].isCommentsLoading;
const getCommentsErrorMessage = (state: State) =>
  state[NameSpace.SelectedOffer].commentsErrorMessage;

export {
  getSelectedOffer,
  getSelectedOfferErrorMessage,
  getIsSelectedOfferLoading,
  getNearOffers,
  getComments,
  getIsNearbyLoading,
  getNearbyErrorMessage,
  getIsCommentsLoading,
  getCommentsErrorMessage,
};
