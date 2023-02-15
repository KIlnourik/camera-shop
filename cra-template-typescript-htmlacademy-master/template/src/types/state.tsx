import { store } from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataProcess = {
  cameras: Camera[];
  promo: Promo;
  isCamerasLoading: boolean;
  isPromoLoading: boolean;
}

export type UserProcess = {
  // userReview: UserReview;
}

export type CatalogProcess = {
  theme: string;
  level: string;
}
