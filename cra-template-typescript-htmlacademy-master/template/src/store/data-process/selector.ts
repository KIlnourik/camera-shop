import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoading;
export const getPromo = (state: State): Promo | undefined => state[NameSpace.Data].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoading;
export const getCamera = (state: State): Camera | undefined=> state[NameSpace.Data].camera;
export const getCameraLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCameraLoading;
