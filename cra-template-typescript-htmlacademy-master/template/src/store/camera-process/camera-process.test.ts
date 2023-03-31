import { cameraProcess } from './camera-process';
import {
  makeFakeCameraInfo,
  makeFakeCameraList,
  makeFakePromo,
} from '../../utils/mocks';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
} from '../api-actions';

const cameras = [...makeFakeCameraList()];
const camera = makeFakeCameraInfo();
const promo = makeFakePromo();
const similarCameras = makeFakeCameraList();

describe('Reducer: cameraProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(cameraProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        cameras: [],
        allCameras: [],
        isAllCamerasLoading: false,
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
      });
  });

  it('should update Cameras by load cameras list', () => {
    const state = {
      cameras: [],
      allCameras: [],
      isAllCamerasLoading: false,
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: cameras })))
      .toEqual({
        cameras, isCamerasLoading: false,
        allCameras: [],
        isAllCamerasLoading: false,
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
      });
  });

  it('should update Camera by load camera', () => {
    const state = {
      cameras: [],
      allCameras: [],
      isAllCamerasLoading: false,
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: camera })))
      .toEqual({
        camera, isCameraLoading: false,
        allCameras: [],
        isAllCamerasLoading: false,
        cameras: [],
        promo: undefined,
        similarCameras: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isSimilarCamerasLoading: false,
      });
  });

  it('should update Similar cameras by load similar camera', () => {
    const state = {
      cameras: [],
      allCameras: [],
      isAllCamerasLoading: false,
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras })))
      .toEqual({
        similarCameras,
        isSimilarCamerasLoading: false,
        allCameras: [],
        isAllCamerasLoading: false,
        cameras: [],
        promo: undefined,
        camera: undefined,
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
      });
  });

  it('should update Promo by load promo', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      allCameras: [],
      isAllCamerasLoading: false,
      similarCameras: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo })))
      .toEqual({
        promo,
        isPromoLoading: false,
        allCameras: [],
        isAllCamerasLoading: false,
        cameras: [],
        camera: undefined,
        similarCameras: [],
        isCamerasLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
      });
  });

});
