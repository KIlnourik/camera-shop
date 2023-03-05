import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CameraProcess } from '../../types/state';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
} from '../api-actions';

const initialState: CameraProcess = {
  cameras: [],
  promo: undefined,
  camera: undefined,
  similarCameras: [],
  isCamerasLoading: false,
  isPromoLoading: false,
  isCameraLoading: false,
  isSimilarCamerasLoading: false,
};

export const cameraProcess = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoading = false;
      })
      .addCase(fetchCameraAction.pending, (state) => {
        state.isCameraLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isCameraLoading = false;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarCamerasLoading = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isSimilarCamerasLoading = false;
      });
  }
});
