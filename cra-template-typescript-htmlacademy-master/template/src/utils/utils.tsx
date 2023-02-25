import { Camera } from '../types/camera';
import { RETRO_CAMERA_NAME } from '../const';

export const getCameraTitle = (camera: Camera) => camera.name.split(' ')[0] === RETRO_CAMERA_NAME
  ? camera.name
  : `${camera.category} ${camera.name}`;

export const getPrice = (price: number): string => {
  const slicedHundredPrice = price.toString().slice(-3);
  const slicedThousandPrice = price.toString().slice(0, -3);
  return `${slicedThousandPrice} ${slicedHundredPrice}`;
};

export function getRatingValues(maxRating: number): number[] {
  const ratingArray: number[] = [];
  for (let i = 1; i <= maxRating; i++) {
    ratingArray.push(i);
  }
  return ratingArray.reverse();
}

