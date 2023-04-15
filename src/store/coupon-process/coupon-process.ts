import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CouponProcess } from '../../types/state';
import { validateCoupon } from '../api-actions';

const initialState: CouponProcess = {
  discountValue: undefined,
  isValidCoupon: undefined,
};

export const couponProcess = createSlice({
  name: NameSpace.Coupon,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.isValidCoupon = undefined;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.discountValue = action.payload;
        state.isValidCoupon = true;
      })
      .addCase(validateCoupon.rejected, (state) => {
        state.discountValue = undefined;
        state.isValidCoupon = false;
      });
  },
});
