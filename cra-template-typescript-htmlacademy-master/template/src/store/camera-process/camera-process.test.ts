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
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        reviews: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: undefined,
      });
  });

  it('should update Cameras by load cameras list', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: cameras })))
      .toEqual({
        cameras, isCamerasLoading: false,
        promo: undefined,
        camera: undefined,
        similarCameras: [],
        reviews: [],
        isPromoLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: false,
      });
  });

  it('should update Camera by load camera', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: camera })))
      .toEqual({
        camera, isCameraLoading: false,
        cameras: [],
        promo: undefined,
        similarCameras: [],
        reviews: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: false,
      });
  });

  it('should update Similar cameras by load similar camera', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras })))
      .toEqual({
        similarCameras,
        isSimilarCamerasLoading: false,
        cameras: [],
        promo: undefined,
        camera: undefined,
        reviews: [],
        isCamerasLoading: false,
        isPromoLoading: false,
        isCameraLoading: false,
        isReviewsLoading: false,
        isReviewSent: false,
      });
  });

  it('should update Promo by load promo', () => {
    const state = {
      cameras: [],
      promo: undefined,
      camera: undefined,
      similarCameras: [],
      reviews: [],
      isCamerasLoading: false,
      isPromoLoading: false,
      isCameraLoading: false,
      isSimilarCamerasLoading: false,
      isReviewsLoading: false,
      isReviewSent: false,
    };
    expect((cameraProcess.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo })))
      .toEqual({
        promo,
        isPromoLoading: false,
        cameras: [],
        camera: undefined,
        similarCameras: [],
        reviews: [],
        isCamerasLoading: false,
        isCameraLoading: false,
        isSimilarCamerasLoading: false,
        isReviewsLoading: false,
        isReviewSent: false,
      });
  });

});
