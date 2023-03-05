import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameraProcess } from './camera-process/camera-process';
import { reviewProcess } from './review-process/review-process';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: cameraProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer
});
