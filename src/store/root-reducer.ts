import { combineReducers } from '@reduxjs/toolkit';

import { offers } from './offers/offers.slice';
import { extraOffer } from './extra-offer/extra-offer.slice';
import { user } from './user/user.slice';

import { NameSpace } from '../const';

const rootReducer = combineReducers({
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.ExtraOffer]: extraOffer.reducer,
  [NameSpace.User]: user.reducer,
});

export { rootReducer };
