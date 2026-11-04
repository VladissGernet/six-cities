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
type RequestId = string | null;

type StateType = {
  city: CityName;

  activeMapMarkerId: ActiveMapMarkerId;

  // Auth.
  authErrorMessage: ErrorMessage;
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
  extraOfferRequestId: RequestId;

  // ExtraOffer NearbyOffers.
  nearbyOffers: Offers | null;
  nearbyErrorMessage: ErrorMessage;
  isNearbyLoading: boolean;
  nearbyOffersRequestId: RequestId;

  // ExtraOffer Comments.
  extraOfferComments: Comments | null;
  extraOfferCommentsErrorMessage: ErrorMessage;
  isCommentsLoading: boolean;
  commentsRequestId: RequestId;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,

  activeMapMarkerId: null,

  // Auth.
  authErrorMessage: null,
  authenticationStatus: AuthenticationStatus.Unknown,
  userAccountData: null,

  // Fetch Offers.
  isOffersDataLoading: false,
  offersErrorMessage: null,
  offers: [],

  /* TODO 8 раздел
    1.
    В Redux часто используют подход store the source of truth, derive the rest — хранить исходные данные,
    а производные вычислять селекторами.

    createSelector мемоизирует вычисления: пока offers не изменились, повторно группировать данные не придётся.

    import { createSelector } from '@reduxjs/toolkit';

    const getOffers = (state: RootState) => state.offers;

    const getGroupedOffers = createSelector(
      [getOffers],
      (offers) => groupOffers(offers),
    );

    const getGroupedFavoriteOffers = createSelector(
      [getGroupedOffers],
      (groupedOffers) => filterFavoriteOffers(groupedOffers),
    );

    2. Разделить reducer по смыслу (combineReducers и createSlice).
    store/
      index.ts
      root-reducer.ts

      offers/
        offers-slice.ts
        offers-selectors.ts

      offer/
        offer-slice.ts
        offer-selectors.ts

      user/
        user-slice.ts
        user-selectors.ts

      api-actions.ts
  */
  groupedOffers: {},
  groupedFavoriteOffers: [],

  // ExtraOffer.
  extraOffer: null,
  extraOfferErrorMessage: null,
  isExtraOfferLoading: false,
  extraOfferRequestId: null,
  // ExtraOffer NearbyOffers.
  nearbyOffers: null,
  nearbyErrorMessage: null,
  isNearbyLoading: false,
  nearbyOffersRequestId: null,
  // ExtraOffer Comments.
  extraOfferComments: null,
  extraOfferCommentsErrorMessage: null,
  isCommentsLoading: false,
  commentsRequestId: null,
};

const ErrorMessages = {
  Authentication:
    'Unable to connect to the server for authentification. Check your connection.',
  AuthServerHTTP: 'Server returned HTTP',
  AuthFailed: 'Failed to check authentication.',
};

// TODO, 8 модуль. Критерий про Combine Reducer, чтобы разбить "универсальный" reducer на более мелкие.
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setActiveMapMaker, (state, { payload }) => {
      state.activeMapMarkerId = payload;
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
      state.authErrorMessage = null;
    })
    .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
      state.authenticationStatus = AuthenticationStatus.Auth;
      state.userAccountData = payload;
    })
    .addCase(checkAuthAction.rejected, (state, { payload, error }) => {
      // Ошбибка не требующая уведомления пользователя.
      if (payload?.kind === 'unauthorized') {
        state.authenticationStatus = AuthenticationStatus.NoAuth;
        state.userAccountData = null;
        return;
      }
      state.authenticationStatus = AuthenticationStatus.Error;

      if (payload?.kind === 'transport') {
        state.authErrorMessage = ErrorMessages.Authentication;
        return;
      }

      if (payload?.kind === 'http') {
        state.authErrorMessage = `${ErrorMessages.AuthServerHTTP} ${payload.status}.`;
        return;
      }

      state.authErrorMessage = error.message || ErrorMessages.AuthFailed;
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
    .addCase(fetchExtraOfferAction.pending, (state, { meta }) => {
      state.isExtraOfferLoading = true;
      state.extraOffer = null;
      state.extraOfferErrorMessage = null;
      state.extraOfferRequestId = meta.requestId;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, { payload, meta }) => {
      if (state.extraOfferRequestId !== meta.requestId) {
        return;
      }

      state.extraOfferRequestId = null;
      state.isExtraOfferLoading = false;
      state.extraOffer = payload;
    })
    .addCase(fetchExtraOfferAction.rejected, (state, { meta, error }) => {
      if (state.extraOfferRequestId !== meta.requestId) {
        return;
      }
      state.extraOfferRequestId = null;
      state.isExtraOfferLoading = false;

      if (meta.aborted) {
        return;
      }

      state.extraOfferErrorMessage =
        error.message || 'Failed to load the offer.';
    })

    // Fetch ExtraOffer NearbyOffers.
    .addCase(fetchNearbyOffers.pending, (state, { meta }) => {
      state.isNearbyLoading = true;
      state.nearbyOffers = null;
      state.nearbyErrorMessage = null;
      state.nearbyOffersRequestId = meta.requestId;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, { payload, meta }) => {
      if (state.nearbyOffersRequestId !== meta.requestId) {
        return;
      }

      state.nearbyOffersRequestId = null;
      state.isNearbyLoading = false;
      state.nearbyOffers = payload;
    })
    .addCase(fetchNearbyOffers.rejected, (state, { meta, error }) => {
      if (state.nearbyOffersRequestId !== meta.requestId) {
        return;
      }

      state.nearbyOffersRequestId = null;
      state.isNearbyLoading = false;

      if (meta.aborted) {
        return;
      }

      // TODO, добавить обработку ошибки.
      state.nearbyErrorMessage =
        error.message || 'Failed to load nearby offers .';
    })

    // Fetch ExtraOffer Comments.
    .addCase(fetchComments.pending, (state, { meta }) => {
      state.isCommentsLoading = true;
      state.extraOfferComments = null;
      state.extraOfferCommentsErrorMessage = null;
      state.commentsRequestId = meta.requestId;
    })
    .addCase(fetchComments.fulfilled, (state, { payload, meta }) => {
      if (state.commentsRequestId !== meta.requestId) {
        return;
      }

      state.commentsRequestId = null;
      state.isCommentsLoading = false;
      state.extraOfferComments = payload;
    })
    .addCase(fetchComments.rejected, (state, { meta, error }) => {
      if (state.commentsRequestId !== meta.requestId) {
        return;
      }

      state.commentsRequestId = null;
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
