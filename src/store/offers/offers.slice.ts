import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { fetchSelectedOfferAction, fetchOffersAction } from '../api-actions';
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

  selectedOfferCityRequestId: null,
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

      // Update city from SelectedOffer.
      // Необходимо на случай перезагрузки страницы офера для обновления города,
      // который ставится по INITIAL_STATE_CITY.
      .addCase(fetchSelectedOfferAction.pending, (state, { meta }) => {
        state.selectedOfferCityRequestId = meta.requestId;
      })
      .addCase(
        fetchSelectedOfferAction.fulfilled,
        (state, { payload, meta }) => {
          if (state.selectedOfferCityRequestId !== meta.requestId) {
            return;
          }

          state.selectedOfferCityRequestId = null;
          state.city = payload.city.name;
        },
      )
      .addCase(fetchSelectedOfferAction.rejected, (state, { meta }) => {
        if (state.selectedOfferCityRequestId !== meta.requestId) {
          return;
        }

        state.selectedOfferCityRequestId = null;
      });
  },
});

const { changeCity, setActiveMapMaker } = offers.actions;

export { offers, changeCity, setActiveMapMaker };
