import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewProcess } from '../../types/state';
import {
  fetchReviewsAction,
  sendReviewAction
} from '../api-actions';

const initialState: ReviewProcess = {
  reviews: [],
  isReviewsLoading: false,
  isReviewSent: false,
  isReviewSending: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewSent = false;
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewSent = true;
        state.isReviewSending = false;
      });
  }
});
