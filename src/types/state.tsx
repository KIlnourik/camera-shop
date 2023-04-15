import { store } from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CameraProcess = {
  cameras: Camera[];
  allCameras: Camera[];
  promo: Promo | undefined;
  camera: Camera | undefined;
  similarCameras: Camera[];
  isCamerasLoading: boolean;
  isAllCamerasLoading: boolean;
  isPromoLoading: boolean;
  isCameraLoading: boolean;
  isSimilarCamerasLoading: boolean;
}

export type ReviewProcess = {
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewSent: boolean;
  isReviewSending: boolean;
}

export type CartProcess = {
  cartProducts: Camera[];
}

export type CouponProcess = {
  discountValue?: number;
  isValidCoupon?: boolean;
}
