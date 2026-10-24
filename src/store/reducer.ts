import { createReducer } from '@reduxjs/toolkit';
import { AuthenticationStatus } from '../const';
import { changeCity, setActiveMapMaker } from './action';
import { filterFavoriteOffers, groupOffers } from '../utils/offers';

import type {
  Offers,
  CityName,
  GroupedOffers,
  GroupedOffersByCity,
  ExtraOffer,
} from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { ExtraUserData } from '../types/user-data';

import {
  fetchOffersAction,
  fetchExtraOfferAction,
  checkAuthAction,
  loginAction,
  logoutAction,
} from './api-actions';

const INITIAL_STATE_CITY = 'Paris';
const ABORTED_REQUEST = 'Aborted';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  groupedFavoirteOffers: GroupedOffersByCity[];
  activeMapMarkerId: ActiveMapMarkerId;
  authenticationStatus: AuthenticationStatus;
  isOffersDataLoading: boolean;
  userAccountData: ExtraUserData | null;

  extraOfferData: ExtraOffer | null;
  isExtraOfferDataError: boolean;
  extraOfferErrorMessage: string | null | undefined;
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

  extraOfferData: null,
  isExtraOfferDataError: false,
  extraOfferErrorMessage: null,
};

// TODO, 8 модуль. Критерий про Combine Reducer, чтобы разбить "универсальный" reducer на более мелкие.
export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      const newCity = payload;
      state.city = newCity;
    })
    .addCase(setActiveMapMaker, (state, { payload }) => {
      const newActiveMapMarkerId = payload;
      state.activeMapMarkerId = newActiveMapMarkerId;
    })

    // Fetch Offers.
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersDataLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
      state.isOffersDataLoading = false;
      const newOffers = payload;
      state.offers = newOffers;
      state.groupedOffers = groupOffers(newOffers);
      state.groupedFavoirteOffers = filterFavoriteOffers(state.groupedOffers);
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersDataLoading = false;
    })

    // Check auth status.
    .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
      state.authenticationStatus = AuthenticationStatus.Auth;
      state.userAccountData = payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authenticationStatus = AuthenticationStatus.NoAuth;
      state.userAccountData = null;
    })

    // Login action.
    .addCase(loginAction.fulfilled, (state, { payload }) => {
      state.authenticationStatus = AuthenticationStatus.Auth;
      state.userAccountData = payload;
    })

    // Logout action.
    .addCase(logoutAction.fulfilled, (state) => {
      state.authenticationStatus = AuthenticationStatus.NoAuth;
      state.userAccountData = null;
    })

    // Fetch ExtraOffer
    .addCase(fetchExtraOfferAction.pending, (state) => {
      state.extraOfferData = null;
      state.isExtraOfferDataError = false;
      state.extraOfferErrorMessage = null;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, { payload }) => {
      state.extraOfferData = payload;
    })
    .addCase(fetchExtraOfferAction.rejected, (state, action) => {
      state.isExtraOfferDataError = true;
      const message = action.error.message;

      state.extraOfferErrorMessage =
        message === ABORTED_REQUEST ? null : message;
    });
});
