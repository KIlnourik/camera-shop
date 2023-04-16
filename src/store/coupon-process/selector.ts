import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCouponValidationStatus = (state: State): boolean | undefined => state[NameSpace.Coupon].isValidCoupon;
export const getDiscountValue = (state: State): number| undefined => state[NameSpace.Coupon].discountValue;
export const getValidCoupon = (state: State): string | undefined => state[NameSpace.Coupon].validCoupon;
