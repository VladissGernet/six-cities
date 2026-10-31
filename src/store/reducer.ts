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

type ErrorMessage = string | null;

type StateType = {
  city: CityName;

  activeMapMarkerId: ActiveMapMarkerId;
  authenticationStatus: AuthenticationStatus;
  userAccountData: ExtraUserData | null;

  // Fetch Offers.
  isOffersDataLoading: boolean;
  offersErrorMessage: ErrorMessage;
  offers: Offers;
  groupedOffers: GroupedOffers;
  groupedFavoriteOffers: GroupedOffersByCity[];

  // ExtraOffer.
  extraOffer: ExtraOffer | null;
  extraOfferErrorMessage: ErrorMessage;
  isExtraOfferLoading: boolean;

  // ExtraOffer NearbyOffers.
  nearbyOffers: Offers | null;
  nearbyErrorMessage: ErrorMessage;
  isNearbyLoading: boolean;

  // ExtraOffer Comments.
  extraOfferComments: Comments | null;
  extraOfferCommentsErrorMessage: ErrorMessage;
  isCommentsLoading: boolean;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,

  activeMapMarkerId: null,
  authenticationStatus: AuthenticationStatus.Unknown,
  userAccountData: null,

  // Fetch Offers.
  isOffersDataLoading: false,
  offersErrorMessage: null,
  offers: [],
  groupedOffers: {},
  groupedFavoriteOffers: [],

  // ExtraOffer.
  extraOffer: null,
  extraOfferErrorMessage: null,
  isExtraOfferLoading: false,
  // ExtraOffer NearbyOffers.
  nearbyOffers: null,
  nearbyErrorMessage: null,
  isNearbyLoading: false,
  // ExtraOffer Comments.
  extraOfferComments: null,
  extraOfferCommentsErrorMessage: null,
  isCommentsLoading: false,
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
      state.offersErrorMessage = null;
    })
    .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
      state.isOffersDataLoading = false;
      state.offers = payload;
      state.groupedOffers = groupOffers(payload);
      state.groupedFavoriteOffers = filterFavoriteOffers(state.groupedOffers);
    })
    .addCase(fetchOffersAction.rejected, (state, { error }) => {
      state.isOffersDataLoading = false;

      state.offersErrorMessage = error.message || 'Failed to load offers.';
    })

    // Check auth status.
    .addCase(checkAuthAction.pending, (state) => {
      state.authenticationStatus = AuthenticationStatus.Loading;
    })
    .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
      state.authenticationStatus = AuthenticationStatus.Auth;
      state.userAccountData = payload;
    })
    .addCase(checkAuthAction.rejected, (state, { payload }) => {
      if (payload?.kind === 'unauthorized') {
        state.authenticationStatus = AuthenticationStatus.NoAuth;
        state.userAccountData = null;
        return;
      }

      state.authenticationStatus = AuthenticationStatus.Error;
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
      state.isExtraOfferLoading = true;
      state.extraOffer = null;
      state.extraOfferErrorMessage = null;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, { payload }) => {
      state.isExtraOfferLoading = false;
      state.extraOffer = payload;
    })
    .addCase(fetchExtraOfferAction.rejected, (state, { meta, error }) => {
      state.isExtraOfferLoading = false;

      if (meta.aborted) {
        return;
      }

      // TODO, добавить обработку ошибки.
      state.extraOfferErrorMessage =
        error.message || 'Failed to load the offer.';
    })

    // Fetch ExtraOffer NearbyOffers.
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isNearbyLoading = true;
      state.nearbyOffers = null;
      state.nearbyErrorMessage = null;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, { payload }) => {
      state.isNearbyLoading = false;
      state.nearbyOffers = payload;
    })
    .addCase(fetchNearbyOffers.rejected, (state, { meta, error }) => {
      state.isNearbyLoading = false;

      if (meta.aborted) {
        return;
      }

      // TODO, добавить обработку ошибки.
      state.nearbyErrorMessage =
        error.message || 'Failed to load nearby offers .';
    })

    // Fetch ExtraOffer Comments.
    .addCase(fetchComments.pending, (state) => {
      state.isCommentsLoading = true;
      state.extraOfferComments = null;
      state.extraOfferCommentsErrorMessage = null;
    })
    .addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.isCommentsLoading = false;
      state.extraOfferComments = payload;
    })
    .addCase(fetchComments.rejected, (state, { meta, error }) => {
      state.isCommentsLoading = false;

      if (meta.aborted) {
        return;
      }

      // TODO, добавить обработку ошибки.
      state.extraOfferCommentsErrorMessage =
        error.message || 'Failed to load comments of the offer.';
    });
});

export { reducer };
