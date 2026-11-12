import { combineReducers } from '@reduxjs/toolkit';

import { offers } from './offers/offers.slice';
import { selectedOffer } from './selected-offer/selected-offer.slice';
import { user } from './user/user.slice';

import { NameSpace } from '../const';

const rootReducer = combineReducers({
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.SelectedOffer]: selectedOffer.reducer,
  [NameSpace.User]: user.reducer,
});

export { rootReducer };
