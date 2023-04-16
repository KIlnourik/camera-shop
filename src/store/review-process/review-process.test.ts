import { reviewProcess } from './review-process';
import {
  makeFakeReviewList,
} from '../../utils/mocks';
import {
  fetchReviewsAction,
  sendReviewAction,
} from '../api-actions';

const reviews = [...makeFakeReviewList()];

describe('Reducer: reviewProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        reviews: [],
        isReviewsLoading: false,
        isReviewSent: undefined,
        isReviewSending: false,
      });
  });

  it('should update Reviews by load reviews', () => {
    const state = {
      reviews: [],
      isReviewsLoading: false,
      isReviewSent: false,
      isReviewSending: false,
    };
    expect((reviewProcess.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews })))
      .toEqual({
        reviews,
        isReviewsLoading: false,
        isReviewSent: false,
        isReviewSending: false,
      });
  });

  it('should send UserReview by upload review from user', () => {
    const state = {
      reviews: [],
      isReviewsLoading: false,
      isReviewSent: undefined,
      isReviewSending: false,
    };
    expect((reviewProcess.reducer(state, { type: sendReviewAction.fulfilled.type, payload: true })))
      .toEqual({
        reviews: [],
        isReviewsLoading: false,
        isReviewSent: true,
        isReviewSending: false,
      });
  });
});
