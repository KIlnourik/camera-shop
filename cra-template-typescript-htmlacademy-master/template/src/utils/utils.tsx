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

export const getFilterItems = (item: string, filters: string[]) => {
  let items: string[] = [...filters];

  items.includes(item) ?
    items = items.filter((value) => value !== item) :
    items.push(item);
  return items;
};

const getPricesList = (cameras: Camera[]) => {
  const prices: number[] = [];
  if (cameras.length) {
    cameras.forEach((camera) => {
      if (!prices.includes(camera.price)) {
        prices.push(camera.price);
      }
    });
  }
  return prices;
};

export const getMinPrice = (cameras: Camera[]) => {
  const pricesList = getPricesList(cameras);
  if (pricesList.length) {
    return Math.min(...pricesList);
  }
  return 0;
};
export const getMaxPrice = (cameras: Camera[]) => {
  const pricesList = getPricesList(cameras);
  if (pricesList.length) {
    return Math.max(...pricesList);
  }
  return 0;
};
