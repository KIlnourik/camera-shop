import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameraProcess } from './camera-process/camera-process';
import { reviewProcess } from './review-process/review-process';
import { cartProcess } from './cart-process/cart-process';
import { couponProcess } from './coupon-process/coupon-process';
import { orderProcess } from './order-process/order-process';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: cameraProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.Cart]: cartProcess.reducer,
  [NameSpace.Coupon]: couponProcess.reducer,
  [NameSpace.Order]: orderProcess.reducer,
});
