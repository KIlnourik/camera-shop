export enum AppRoute {
  Catalog = '/catalog',
  Pages = ':page?',
  Product = 'cameras/:id',
  Parameters = 'parameters',
  Description = 'desc',
  Basket = 'basket',
};

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';

export const REQUEST_TIMEOUT = 5000;

export enum NameSpace {
  Data = 'Data',
  Catalog = 'Catalog',
};

export enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Coupons = '/coupons',
  Orders = '/orders'
};

export const MAX_RATING_COUNT = 5;

export const RETRO_CAMERA_NAME = 'Ретрокамера';

export const MAX_CARDS_PER_PAGE = 9;

export enum Tabs {
  Parameters = 'Характеристики',
  Description = 'Описание'
};

export const MAX_SHOWN_SLIDER_CARDS = 3;

export const MAX_REVIEWS_COUNT = 3;
