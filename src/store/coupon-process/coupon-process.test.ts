import { couponProcess } from './coupon-process';
import {
  validateCouponAction,
} from '../api-actions';

describe('Reducer: couponProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(couponProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        discountValue: undefined,
        isValidCoupon: undefined,
        validCoupon: undefined,
      });
  });

  it('should validate Coupon', () => {
    const state = {
      discountValue: undefined,
      isValidCoupon: undefined,
      validCoupon: undefined,
    };
    expect((couponProcess.reducer(state, { type: validateCouponAction.fulfilled.type, payload: true })))
      .toEqual({
        discountValue: undefined,
        isValidCoupon: true,
        validCoupon: undefined,
      });
  });

  it('should reject validation', () => {
    const state = {
      discountValue: undefined,
      isValidCoupon: undefined,
      validCoupon: undefined,
    };
    expect((couponProcess.reducer(state, { type: validateCouponAction.rejected.type, payload: true })))
      .toEqual({
        discountValue: undefined,
        isValidCoupon: false,
        validCoupon: undefined,
      });
  });

});
