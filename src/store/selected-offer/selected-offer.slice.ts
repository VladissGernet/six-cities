import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { fetchSelectedOfferAction } from '../api-actions';

import type { SelectedOfferStateType } from '../../types/selected-offer';

const initialState: SelectedOfferStateType = {
  selectedOffer: null,
  selectedOfferErrorMessage: null,
  isSelectedOfferLoading: false,
  selectedOfferRequestId: null,
};

const selectedOffer = createSlice({
  name: NameSpace.SelectedOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSelectedOfferAction.pending, (state, { meta }) => {
        state.isSelectedOfferLoading = true;
        state.selectedOffer = null;
        state.selectedOfferErrorMessage = null;
        state.selectedOfferRequestId = meta.requestId;
      })
      .addCase(
        fetchSelectedOfferAction.fulfilled,
        (state, { payload, meta }) => {
          if (state.selectedOfferRequestId !== meta.requestId) {
            return;
          }

          state.selectedOfferRequestId = null;
          state.isSelectedOfferLoading = false;
          state.selectedOffer = payload;
        },
      )
      .addCase(fetchSelectedOfferAction.rejected, (state, { meta, error }) => {
        if (state.selectedOfferRequestId !== meta.requestId) {
          return;
        }
        state.selectedOfferRequestId = null;
        state.isSelectedOfferLoading = false;

        if (meta.aborted) {
          return;
        }

        state.selectedOfferErrorMessage =
          error.message || 'Failed to load the offer.';
      });
  },
});

export { selectedOffer };
