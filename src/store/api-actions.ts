import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { URLSearchParams } from 'url';
import { CouponPost } from '../types/coupon-post';

export const fetchCamerasAction = createAsyncThunk<Camera[], URLSearchParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (params, { extra: api }) => {
    const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}?`, { params: params });
    return data;
  });

export const fetchAllCamerasAction = createAsyncThunk<Camera[], void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchAllCameras',
  async (_args, { extra: api }) => {
    const { data } = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);


export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`);
    return data;
  }
);

export const sendReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({ cameraId, ...data }, { dispatch, extra: api }) => {
    await api.post<ReviewPost>(APIRoute.Reviews, { cameraId, ...data });
    dispatch(fetchReviewsAction(String(cameraId)));
  }
);

export const validateCoupon = createAsyncThunk<number, CouponPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/couponPost',
  async (coupon, { extra: api}) => {
    const response = await api.post<number>(APIRoute.Coupons, { ...coupon });
    return response.data;

  }
);
