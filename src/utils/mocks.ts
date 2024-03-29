import { datatype, date, commerce, name, image, random } from 'faker';
import { Camera } from '../types/camera';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import {Promo} from '../types/promo';
import { URLSearchParams } from 'url';
import { CouponPost } from '../types/coupon-post';
import { OrderPost } from '../types/order-post';

export const makeFakeCameraInfo = (): Camera => ({
  id: Number(random.alphaNumeric(1000)),
  name: commerce.productName(),
  vendorCode: random.alphaNumeric(),
  type: commerce.product(),
  category: commerce.productAdjective(),
  description: commerce.productDescription(),
  level: commerce.productAdjective(),
  rating: datatype.number({ min: 0, max: 5 }),
  price: Number(commerce.price()),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number({ min: 0, max: 50 })
} as Camera);

export const makeFakeCameraList = (): Camera[] => (new Array(35).fill(null).map(() => makeFakeCameraInfo()) );

export const makeFakeReview = (): Review => ({
  id: random.alphaNumeric(),
  userName: name.firstName(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.words(),
  rating: datatype.number({ min: 0, max: 5 }),
  createAt: String(date.past()),
  cameraId: Number(datatype.uuid()),
} as Review);

export const makeFakeReviewList = (): Review[] => (new Array(9).fill(null).map(() => makeFakeReview()) );

export const makeFakeUserReview = (): ReviewPost => ({
  cameraId: Number(datatype.uuid()),
  userName: name.firstName(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.words(),
  rating: datatype.number({ min: 0, max: 5 }),
} as ReviewPost);

export const makeFakePromo = (): Promo => ({
  id: Number(datatype.uuid()),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
} as Promo);

export const makeFakeQueryParams = (): URLSearchParams => new URLSearchParams({
  _sort: 'sort',
  _order: 'order',
  category: 'category',
  type: 'type',
  level: 'level',
});

export const makeFakeCoupon = (): CouponPost => ({
  coupon: random.word(),
});

export const makeFakeOrder = (): OrderPost => ({
  camerasIds: [Number(random.alphaNumeric(1000))],
  coupon: random.word(),
});


