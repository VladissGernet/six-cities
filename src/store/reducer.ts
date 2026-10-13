import { createReducer } from '@reduxjs/toolkit';
import { AuthenticationStatus, INITIAL_STATE_CITY } from '../const';
import {
  changeCity,
  requireAuthenticationStatus,
  setActiveMapMaker,
  setUserAccountData,
} from './action';
import { filterFavoriteOffers, groupOffers } from '../utils/offers';

import type {
  Offers,
  CityName,
  GroupedOffers,
  GroupedOffersByCity,
} from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { UserData } from '../types/user-data';
import { fetchOffersAction } from './api-actions';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  groupedFavoirteOffers: GroupedOffersByCity[];
  activeMapMarkerId: ActiveMapMarkerId;
  AuthenticationStatus: AuthenticationStatus;
  isOffersDataLoading: boolean;
  userAccountData: UserData | null;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers: [],
  groupedOffers: {},
  groupedFavoirteOffers: [],
  activeMapMarkerId: null,
  AuthenticationStatus: AuthenticationStatus.Unknown,
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
    // Fetch
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersDataLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.isOffersDataLoading = false;
      const newOffers = action.payload;
      state.offers = newOffers;
      state.groupedOffers = groupOffers(newOffers);
      state.groupedFavoirteOffers = filterFavoriteOffers(state.groupedOffers);
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      // TODO, Расмотреть вариант с отображением ошибки как тут:
      // Также здесь рассказано про slice в reducer.
      // https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/7/item/17
      // 1:33:41

      // Ошибка будет обработана через api.ts.
      state.isOffersDataLoading = false;
    })
    .addCase(requireAuthenticationStatus, (state, action) => {
      state.AuthenticationStatus = action.payload;
    })
    .addCase(setUserAccountData, (state, action) => {
      state.userAccountData = action.payload;
    });
});
