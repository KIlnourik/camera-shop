import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoading;
export const getPromo = (state: State): Promo | undefined => state[NameSpace.Data].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoading;
export const getCamera = (state: State): Camera | undefined=> state[NameSpace.Data].camera;
export const getCameraLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCameraLoading;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Data].similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSimilarCamerasLoading;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsLoading;
export const getReviewSendingStatus = (state: State): boolean => state[NameSpace.Data].isReviewSent;
