import { createReducer } from '@reduxjs/toolkit';
import { AuthenticationStatus } from '../const';
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

import { fetchOffersAction, fetchExtraOfferAction } from './api-actions';

const INITIAL_STATE_CITY = 'Paris';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  groupedFavoirteOffers: GroupedOffersByCity[];
  activeMapMarkerId: ActiveMapMarkerId;
  authenticationStatus: AuthenticationStatus;
  isOffersDataLoading: boolean;
  userAccountData: UserData | null;
  isExtraOfferLoading: boolean;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers: [],
  groupedOffers: {},
  groupedFavoirteOffers: [],
  activeMapMarkerId: null,
  authenticationStatus: AuthenticationStatus.Unknown,
  isOffersDataLoading: false,
  userAccountData: null,
  isExtraOfferLoading: false,
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

    .addCase(requireAuthenticationStatus, (state, action) => {
      state.authenticationStatus = action.payload;
    })
    .addCase(setUserAccountData, (state, action) => {
      state.userAccountData = action.payload;
    })
    // Fetch Offers.
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
      state.isOffersDataLoading = false;
    })
    // Fetch Offer
    .addCase(fetchExtraOfferAction.pending, (state) => {
      // TODO, add LoadingScreen
      state.isExtraOfferLoading = true;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, action) => {
      state.isExtraOfferLoading = false;

      // TODO, ExtraData loaded action.payload
      console.log(action.payload);
    })
    .addCase(fetchExtraOfferAction.rejected, (state) => {
      state.isExtraOfferLoading = false;

      // TODO, add error definition
      console.log('error');
    });
});
