import { store } from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataProcess = {
  cameras: Camera[];
  promo: Promo | undefined;
  camera: Camera | undefined;
  similarCameras: Camera[];
  reviews: Review[];
  isCamerasLoading: boolean;
  isPromoLoading: boolean;
  isCameraLoading: boolean;
  isSimilarCamerasLoading: boolean;
  isReviewsLoading: boolean;
}

export type UserProcess = {
  // userReview: UserReview;
}

export type CatalogProcess = {
  theme: string;
  level: string;
}
