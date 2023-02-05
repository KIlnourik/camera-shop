import { Camera } from '../../types/camera';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCamerasLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCamerasLoading;

