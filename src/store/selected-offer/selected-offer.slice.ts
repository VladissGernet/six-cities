import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import {
  fetchComments,
  fetchSelectedOfferAction,
  fetchNearbyOffers,
} from '../api-actions';

import type { SelectedOfferStateType } from '../../types/offers';

const initialState: SelectedOfferStateType = {
  selectedOffer: null,
  selectedOfferErrorMessage: null,
  isSelectedOfferLoading: false,
  selectedOfferRequestId: null,

  // SelectedOffer NearbyOffers.
  nearbyOffers: null,
  nearbyErrorMessage: null,
  isNearbyLoading: false,
  nearbyOffersRequestId: null,

  // SelectedOffer Comments.
  comments: null,
  commentsErrorMessage: null,
  isCommentsLoading: false,
  commentsRequestId: null,
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
      })

      // NearbyOffers.
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
      })

      // Comments.
      .addCase(fetchComments.pending, (state, { meta }) => {
        state.isCommentsLoading = true;
        state.comments = null;
        state.commentsErrorMessage = null;
        state.commentsRequestId = meta.requestId;
      })
      .addCase(fetchComments.fulfilled, (state, { payload, meta }) => {
        if (state.commentsRequestId !== meta.requestId) {
          return;
        }

        state.commentsRequestId = null;
        state.isCommentsLoading = false;
        state.comments = payload;
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

        state.commentsErrorMessage =
          error.message || 'Failed to load comments of the offer.';
      });
  },
});

export { selectedOffer };
