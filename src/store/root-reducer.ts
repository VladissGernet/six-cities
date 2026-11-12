import { combineReducers } from '@reduxjs/toolkit';

import { offers } from './offers/offers.slice';
import { selectedOffer } from './selected-offer/selected-offer.slice';
import { user } from './user/user.slice';

import { NameSpace } from '../const';
import { selectedOfferNearby } from './selected-offer/selected-offer-nearby.slice';
import { selectedOfferComments } from './selected-offer/selected-offer-comments.slice';

const rootReducer = combineReducers({
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.SelectedOffer]: selectedOffer.reducer,
  [NameSpace.SelectedOfferComments]: selectedOfferComments.reducer,
  [NameSpace.SelectedOfferNearby]: selectedOfferNearby.reducer,
  [NameSpace.User]: user.reducer,
});

export { rootReducer };
