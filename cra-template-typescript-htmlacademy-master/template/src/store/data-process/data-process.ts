import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/promo';
import { DataProcess } from '../../types/state';
import { Camera } from '../../types/camera';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchPromoAction,
} from '../api-actions';

const initialState: DataProcess = {
  cameras: [],
  promo: undefined,
  camera: undefined,
  isCamerasLoading: false,
  isPromoLoading: false,
  isCameraLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
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
      ;
  }
});
