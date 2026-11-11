import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const getExtraOffer = (state: State) => state[NameSpace.ExtraOffer].extraOffer;
const getExtraOfferErrorMessage = (state: State) =>
  state[NameSpace.ExtraOffer].extraOfferErrorMessage;
const getIsExtraOfferLoading = (state: State) =>
  state[NameSpace.ExtraOffer].isExtraOfferLoading;

const getNearOffers = (state: State) =>
  state[NameSpace.ExtraOffer].nearbyOffers;
const getIsNearbyLoading = (state: State) =>
  state[NameSpace.ExtraOffer].isNearbyLoading;
const getNearbyErrorMessage = (state: State) =>
  state[NameSpace.ExtraOffer].nearbyErrorMessage;

const getComments = (state: State) => state[NameSpace.ExtraOffer].comments;
const getIsCommentsLoading = (state: State) =>
  state[NameSpace.ExtraOffer].isCommentsLoading;
const getCommentsErrorMessage = (state: State) =>
  state[NameSpace.ExtraOffer].commentsErrorMessage;

export {
  getExtraOffer,
  getExtraOfferErrorMessage,
  getIsExtraOfferLoading,
  getNearOffers,
  getComments,
  getIsNearbyLoading,
  getNearbyErrorMessage,
  getIsCommentsLoading,
  getCommentsErrorMessage,
};
