import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';

export const getCameras = (state: State): Camera[] => state[NameSpace.Camera].cameras;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Camera].isCamerasLoading;
export const getPromo = (state: State): Promo | undefined => state[NameSpace.Camera].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Camera].isPromoLoading;
export const getCamera = (state: State): Camera | undefined=> state[NameSpace.Camera].camera;
export const getCameraLoadingStatus = (state: State): boolean => state[NameSpace.Camera].isCameraLoading;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Camera].similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Camera].isSimilarCamerasLoading;
