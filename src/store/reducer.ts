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
  ExtraOffer,
} from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { UserData } from '../types/user-data';

import { fetchOffersAction, fetchExtraOfferAction } from './api-actions';

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
  userAccountData: UserData | null;

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

    // Fetch ExtraOffer
    .addCase(fetchExtraOfferAction.pending, (state) => {
      // Очистка предыдущего extraOffer.
      state.extraOfferData = null;
      state.isExtraOfferDataError = false;
      state.extraOfferErrorMessage = null;
    })
    .addCase(fetchExtraOfferAction.fulfilled, (state, action) => {
      state.extraOfferData = action.payload;
    })
    .addCase(fetchExtraOfferAction.rejected, (state, action) => {
      state.isExtraOfferDataError = true;
      const message = action.error.message;

      state.extraOfferErrorMessage =
        message === ABORTED_REQUEST ? null : message;
    });
});
