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
        cameras: [],
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        reviews: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: undefined,
      });
  });

  it('should update Reviews by load reviews', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((reviewProcess.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews })))
      .toEqual({
        reviews,
        isReviewsLoading: false,
        cameras: [],
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewSent: false,
      });
  });

  it('should send UserReview by upload review from user', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((reviewProcess.reducer(state, { type: sendReviewAction.fulfilled.type, payload: true })))
      .toEqual({
        promo: undefined,
        isPromoLoading: false,
        cameras: [],
        camera: undefined,
        similarCameras: [],
        reviews: [],
        isCamerasLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: true,
      });
  });
});
