import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, INITIAL_STATE_CITY } from '../const';
import {
  changeCity,
  requireAuthorizationStatus,
  setActiveMapMaker,
  setUserAccountData,
} from './action';
import { groupOffers } from '../utils/offers';

import type { Offers, CityName, GroupedOffers } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { UserData } from '../types/user-data';
import { fetchOffersAction } from './api-actions';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  activeMapMarkerId: ActiveMapMarkerId;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userAccountData: UserData | null;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers: [],
  groupedOffers: {},
  activeMapMarkerId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  userAccountData: null,
};

// TODO, 8 модуль. Критерий про Combine Reducer, чтобы разбить "универсальный" reducer на более мелкие.
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
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersDataLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.isOffersDataLoading = false;
      const newOffers = action.payload;
      state.offers = newOffers;
      state.groupedOffers = groupOffers(newOffers);
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      // Ошибка будет обработана через api.ts.
      state.isOffersDataLoading = false;
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAccountData, (state, action) => {
      state.userAccountData = action.payload;
    });
});
