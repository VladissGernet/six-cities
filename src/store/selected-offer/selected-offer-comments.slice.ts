import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import type { SelectedOfferCommentsStateType } from '../../types/selected-offer';
import { fetchComments } from '../api-actions';

const initialState: SelectedOfferCommentsStateType = {
  comments: null,
  commentsErrorMessage: null,
  isCommentsLoading: false,
  commentsRequestId: null,
};

const selectedOfferComments = createSlice({
  name: NameSpace.SelectedOfferComments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

export { selectedOfferComments };
