export enum AppRoute {
  Catalog = '/',
  Pages = ':page?',
  Product = '/cameras/:id',
  Parameters = 'parameters',
  Description = 'desc',
  Cart = '/cart',
  NotFound = '*',
}

export enum NameSpace {
  Camera = 'Camera',
  Review = 'Review',
  Cart = 'Cart',
  Coupon = 'Coupon',
  Order = 'Order'
}

export enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Coupons = '/coupons',
  Orders = '/orders'
}

export enum Tabs {
  Parameters = 'Характеристики',
  Description = 'Описание'
}

export enum Popup {
  BasketPopup = 'basketPopup',
  BasketSuccessPopup = 'basketSuccessPopup',
  ReviewPopup = 'reviewPopup',
  ReviewSuccessPopup = 'reviewSuccessPopup',
  DeleteProductPopup = 'deleteProductPopup',
  OrderSuccessPopup = 'orderSuccessPopup',
}

export enum Sorts {
  Price = 'price',
  Rating = 'rating',
  ASC = 'asc',
  DESC = 'desc'
}

export enum Filters {
  photocamera = 'Фотоаппарат',
  videocamera = 'Видеокамера',
  digital = 'Цифровая',
  film = 'Плёночная',
  snapshot = 'Моментальная',
  collection = 'Коллекционная',
  zero = 'Нулевой',
  nonProfessional = 'Любительский',
  professional = 'Профессиональный',
}

type RatingValuesType = {
  [index: number]: string;
}

export const RatingValues: RatingValuesType = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';

export const REQUEST_TIMEOUT = 5000;

export const MAX_RATING_COUNT = 5;

export const RETRO_CAMERA_NAME = 'Ретрокамера';

export const MAX_CARDS_PER_PAGE = 9;

export const MAX_SHOWN_SLIDER_CARDS = 3;

export const MAX_REVIEWS_COUNT = 3;

export const MAX_RATING_VALUE = 5;

export const CAMERAS_URL = 'cameras';

export const DEBOUNCE_TIMEOUT = 500;

export const STATE_ZERO = 0;

export const STATE_ONE = 1;

export const OFFSET_ONE = 1;

export const OFFSET_TWO = 2;

export const INDEX_OF_SPLITTED_URL = 1;

export enum ProductsCount {
  minCount = 1,
  maxCount = 99,
}

export const MAX_DIGITS_AFTER_POINT = 2;
