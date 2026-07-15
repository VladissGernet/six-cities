const RATING_TO_PERCENT = 10;
const PLACES_IMAGE_SIZES = {
  width: 260,
  height: 200,
};
const FAVORITES_IMAGE_SIZES = {
  width: 150,
  height: 110,
};

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer',
  NotFoundPage = '/not-found-page',
}

const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = (typeof CITY_NAMES)[number];

// 100 / 5 = 20 (100 - 100% ширины элемента, а 5 - максимальное количество звезд.)
const PERCENT_PER_STAR = 20;

export {
  RATING_TO_PERCENT,
  PLACES_IMAGE_SIZES,
  FAVORITES_IMAGE_SIZES,
  CITY_NAMES,
  PERCENT_PER_STAR,
};
