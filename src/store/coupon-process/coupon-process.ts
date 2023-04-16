import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CouponProcess } from '../../types/state';
import { validateCouponAction } from '../api-actions';

const initialState: CouponProcess = {
  discountValue: undefined,
  isValidCoupon: undefined,
  validCoupon: undefined
};

export const couponProcess = createSlice({
  name: NameSpace.Coupon,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(validateCouponAction.pending, (state) => {
        state.isValidCoupon = undefined;
      })
      .addCase(validateCouponAction.fulfilled, (state, action) => {
        const { discount, coupon } = action.payload;
        state.discountValue = discount;
        state.validCoupon = coupon;
        state.isValidCoupon = true;
      })
      .addCase(validateCouponAction.rejected, (state) => {
        state.discountValue = undefined;
        state.validCoupon = undefined;
        state.isValidCoupon = false;
      });
  },
});
