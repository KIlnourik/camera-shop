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
  isReviewSent: undefined,
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
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.isReviewSent = true;
      })
      .addCase(sendReviewAction.pending, (state, action) => {
        state.isReviewSent = false;
      });
  }
});
