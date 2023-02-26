import { datatype, date, commerce, name, image, random } from 'faker';
import { Camera } from '../types/camera';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import {Promo} from '../types/promo';

export const makeFakeCameraInfo = (): Camera => ({
  id: Number(datatype.uuid()),
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
});

export const makeFakeReview = (): Review => ({
  id: random.alphaNumeric(),
  userName: name.firstName(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.words(),
  rating: datatype.number({ min: 0, max: 5 }),
  createAt: String(date.past()),
  cameraId: Number(datatype.uuid()),
});

export const makeFakeUserReview = (): ReviewPost => ({
  cameraId: Number(datatype.uuid()),
  userName: name.firstName(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.words(),
  rating: datatype.number({ min: 0, max: 5 }),
});

export const makeFakePromo = (): Promo => ({
  id: Number(datatype.uuid()),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

