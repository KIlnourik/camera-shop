import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { StatusCodes } from 'http-status-codes';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, { dispatch, extra: api }) => {
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
  async (_arg, { dispatch, extra: api }) => {
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
  async (cameraId, { dispatch, extra: api }) => {
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
  async (cameraId, { dispatch, extra: api }) => {
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
  async (cameraId, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`);
    return data;
  }
);

export const sendReviewAction = createAsyncThunk<boolean, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({ cameraId, ...data }, { dispatch, extra: api }) => {
    const response = await api.post<ReviewPost>(APIRoute.Reviews, { cameraId, ...data });
    dispatch(fetchReviewsAction(String(cameraId)));
    if (response.status === StatusCodes.CREATED) {
      return true;
    } else {
      return false;
    }
  }
);

