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
  Comments,
} from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { ExtraUserData } from '../types/user-data';

import {
  fetchOffersAction,
  fetchExtraOfferAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchNearbyOffers,
  fetchComments,
} from './api-actions';

const INITIAL_STATE_CITY = 'Paris';

type ErrorMessage = string | null | undefined;

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
  // TODO, исправить опечатку.
  groupedFavoirteOffers: GroupedOffersByCity[];
  activeMapMarkerId: ActiveMapMarkerId;
  authenticationStatus: AuthenticationStatus;
  isOffersDataLoading: boolean;
  userAccountData: ExtraUserData | null;

  // ExtraOffer.
  extraOffer: ExtraOffer | null;
  isExtraOfferError: boolean;
  extraOfferErrorMessage: ErrorMessage;

  // ExtraOffer NearbyOffers.
  nearbyOffers: Offers | null;
  isNearbyError: boolean;
  nearbyErrorMessage: ErrorMessage;

  // ExtraOffer Comments.
  extraOfferComments: Comments | null;
  isExtraOfferCommentsError: boolean;
  extraOfferCommentsErrorMessage: ErrorMessage;
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

  // ExtraOffer.
  extraOffer: null,
  isExtraOfferError: false,
  extraOfferErrorMessage: null,
  // ExtraOffer NearbyOffers.
  nearbyOffers: null,
  isNearbyError: false,
  nearbyErrorMessage: null,
  // ExtraOffer Comments.
  extraOfferComments: null,
  isExtraOfferCommentsError: false,
  extraOfferCommentsErrorMessage: null,
};

// TODO, 8 модуль. Критерий про Combine Reducer, чтобы разбить "универсальный" reducer на более мелкие.
const reducer = createReducer(initialState, (builder) => {
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

    // ExtraOffer.
    // Fetch ExtraOffer
    .addCase(fetchExtraOfferAction.pending, (state) => {
      state.extraOffer = null;
      state.isExtraOfferError = false;
      state.extraOfferErrorMessage = null;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, { payload }) => {
      state.extraOffer = payload;
    })
    .addCase(fetchExtraOfferAction.rejected, (state, { meta, error }) => {
      if (meta.aborted) {
        state.isExtraOfferError = false;
        state.extraOfferErrorMessage = null;
        return;
      }

      state.isExtraOfferError = true;
      state.extraOfferErrorMessage =
        error.message ?? 'Failed to load the offer.';
    })

    // Fetch ExtraOffer NearbyOffers.
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.nearbyOffers = null;
      state.isNearbyError = false;
      state.nearbyErrorMessage = null;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, { payload }) => {
      state.nearbyOffers = payload;
    })
    .addCase(fetchNearbyOffers.rejected, (state, { meta, error }) => {
      if (meta.aborted) {
        state.isNearbyError = false;
        state.nearbyErrorMessage = null;
        return;
      }

      state.isNearbyError = true;
      state.nearbyErrorMessage =
        error.message ?? 'Failed to load nearby offers the offer.';
    })

    // Fetch ExtraOffer Comments.
    .addCase(fetchComments.pending, (state) => {
      state.extraOfferComments = null;
      state.isExtraOfferCommentsError = false;
      state.extraOfferCommentsErrorMessage = null;
    })
    .addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.extraOfferComments = payload;
    })
    .addCase(fetchComments.rejected, (state, { meta, error }) => {
      if (meta.aborted) {
        state.isExtraOfferCommentsError = false;
        state.extraOfferCommentsErrorMessage = null;
        return;
      }

      state.isExtraOfferCommentsError = true;
      state.extraOfferCommentsErrorMessage =
        error.message ?? 'Failed to load comments of the offer.';
    });
});

export { reducer };
