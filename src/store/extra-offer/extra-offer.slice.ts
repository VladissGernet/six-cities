import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import {
  fetchComments,
  fetchExtraOfferAction,
  fetchNearbyOffers,
} from '../api-actions';

import type { ExtraOfferStateType } from '../../types/offers';

const initialState: ExtraOfferStateType = {
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
  comments: null,
  commentsErrorMessage: null,
  isCommentsLoading: false,
  commentsRequestId: null,
};

const extraOffer = createSlice({
  name: NameSpace.ExtraOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

export { extraOffer };
