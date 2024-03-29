import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import {
  makeFakeCameraInfo,
  makeFakeCameraList,
  makeFakePromo,
  makeFakeReviewList,
  makeFakeUserReview,
  makeFakeQueryParams,
  makeFakeOrder,
  makeFakeCoupon
} from '../utils/mocks';
import { APIRoute } from '../const';
import {
  fetchAllCamerasAction,
  fetchCameraAction,
  fetchCamerasAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarCamerasAction,
  sendOrderAction,
  sendReviewAction,
  validateCouponAction
} from './api-actions';
import { ReviewPost } from '../types/review-post';
import { CouponPost } from '../types/coupon-post';
import { OrderPost } from '../types/order-post';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);


  it('should dispatch Load_Cameras when GET /cameras?', async () => {
    const mockCameras = makeFakeCameraList();
    const queryParams = makeFakeQueryParams();

    mockAPI
      .onGet(`${APIRoute.Cameras}?`)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction(queryParams));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_All_Cameras when GET /cameras', async () => {
    const mockCameras = makeFakeCameraList();

    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchAllCamerasAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAllCamerasAction.pending.type,
      fetchAllCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Camera when GET /cameras/:id', async () => {
    const mockCamera = makeFakeCameraInfo();
    mockAPI
      .onGet(`${APIRoute.Cameras}/6`)
      .reply(200, mockCamera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction('6'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Similar_Cameras when GET /cameras/:id/similar', async () => {
    const mockSimilarCameras = makeFakeCameraList();
    mockAPI
      .onGet(`${APIRoute.Cameras}/6/similar`)
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction('6'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Promo when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Reviews when GET /cameras/:id/reviews', async () => {
    const mockReviews = makeFakeReviewList();
    mockAPI
      .onGet(`${APIRoute.Cameras}/6${APIRoute.Reviews}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction('6'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch SendReview and Load_Reviews when POST /reviews', async () => {

    const fakeReview: ReviewPost = { ...makeFakeUserReview() };

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(201)
      .onGet(`${APIRoute.Cameras}/6${APIRoute.Reviews}`)
      .reply(200);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(sendReviewAction(fakeReview));
    await store.dispatch(fetchReviewsAction('6'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      fetchReviewsAction.pending.type,
      sendReviewAction.fulfilled.type,
      fetchReviewsAction.pending.type,
      fetchReviewsAction.rejected.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should ValidateCoupon when POST /coupons', async () => {

    const fakeCoupon: CouponPost = makeFakeCoupon();

    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(201);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(validateCouponAction(fakeCoupon));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      validateCouponAction.pending.type,
      validateCouponAction.fulfilled.type,
    ]);
  });

  it('should SendOrder when POST /orders', async () => {

    const fakeOrder: OrderPost = makeFakeOrder();

    mockAPI
      .onPost(APIRoute.Orders)
      .reply(201);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(sendOrderAction(fakeOrder));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.fulfilled.type,
    ]);
  });

});
