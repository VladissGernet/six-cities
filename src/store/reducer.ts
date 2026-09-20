// Моковые данные.
// TODO, Удалить остатки данных
// import { offers } from '../mocks/offers';

import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, INITIAL_STATE_CITY } from '../const';
import {
  changeCity,
  loadOffers,
  requireAuthorizationStatus,
  setActiveMapMaker,
  setError,
} from './action';
import { groupOffers } from '../utils/offers';

import type { Offers, CityName, GroupedOffers } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { StateError } from '../types/state';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  activeMapMarkerId: ActiveMapMarkerId;
  authorizationStatus: AuthorizationStatus;
  error: StateError;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers: [],
  groupedOffers: {},
  activeMapMarkerId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const newCity = action.payload;
      state.city = newCity;
    })
    .addCase(setActiveMapMaker, (state, action) => {
      const newActiveMapMarkerId = action.payload;
      state.activeMapMarkerId = newActiveMapMarkerId;
    })
    .addCase(loadOffers, (state, action) => {
      const newOffers = action.payload;
      state.offers = newOffers;
      state.groupedOffers = groupOffers(newOffers);
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
