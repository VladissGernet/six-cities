import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import type { SelectedOfferNearbyStateType } from '../../types/selected-offer';
import { fetchNearbyOffers } from '../api-actions';

const initialState: SelectedOfferNearbyStateType = {
  nearbyOffers: null,
  nearbyErrorMessage: null,
  isNearbyLoading: false,
  nearbyOffersRequestId: null,
};

const selectedOfferNearby = createSlice({
  name: NameSpace.SelectedOfferNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

        state.nearbyErrorMessage =
          error.message || 'Failed to load nearby offers.';
      });
  },
});

export { selectedOfferNearby };
