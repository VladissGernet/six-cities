import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { fetchExtraOfferAction, fetchOffersAction } from '../api-actions';
import { filterFavoriteOffers, groupOffers } from '../../utils/offers';

// Types.
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OffersStateType } from '../../types/offers';
import type { ActiveMapMarkerId } from '../../types/general';

const INITIAL_STATE_CITY = 'Paris';

const initialState: OffersStateType = {
  city: INITIAL_STATE_CITY,
  activeMapMarkerId: null,

  isOffersDataLoading: false,
  offersErrorMessage: null,
  offers: [],
  groupedOffers: {},
  groupedFavoriteOffers: [],

  extraOfferCityRequestId: null,
};

const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, { payload }: PayloadAction<CityName>) => {
      state.city = payload;
    },
    setActiveMapMaker: (
      state,
      { payload }: PayloadAction<ActiveMapMarkerId>,
    ) => {
      state.activeMapMarkerId = payload;
    },
  },
  extraReducers(builder) {
    builder
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

      // Update city from ExtraOffer.
      // Необходимо на случай перезагрузки страницы офера для обновления города,
      // который ставится по INITIAL_STATE_CITY.
      .addCase(fetchExtraOfferAction.pending, (state, { meta }) => {
        state.extraOfferCityRequestId = meta.requestId;
      })
      .addCase(fetchExtraOfferAction.fulfilled, (state, { payload, meta }) => {
        if (state.extraOfferCityRequestId !== meta.requestId) {
          return;
        }

        state.extraOfferCityRequestId = null;
        state.city = payload.city.name;
      })
      .addCase(fetchExtraOfferAction.rejected, (state, { meta }) => {
        if (state.extraOfferCityRequestId !== meta.requestId) {
          return;
        }

        state.extraOfferCityRequestId = null;
      });
  },
});

const { changeCity, setActiveMapMaker } = offers.actions;

export { offers, changeCity, setActiveMapMaker };
