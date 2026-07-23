const RATING_TO_PERCENT = 10;
const PLACES_IMAGE_SIZES = {
  width: 260,
  height: 200,
};
const FAVORITES_IMAGE_SIZES = {
  width: 150,
  height: 110,
};

enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer',
  NotFoundPage = '/not-found-page',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
/**
 * Ещё создёт тип { CityName } from "./types/offers".
 */
const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

/**
 * Ещё создёт тип { RatingValue } from "./types/general".
 */
const RATING_VALUES = ['1', '2', '3', '4', '5'] as const;

// 100 / 5 = 20 (100 - 100% ширины элемента, а 5 - максимальное количество звезд.)
const PERCENT_PER_STAR = 20;

export {
  RATING_TO_PERCENT,
  PLACES_IMAGE_SIZES,
  FAVORITES_IMAGE_SIZES,
  CITY_NAMES,
  PERCENT_PER_STAR,
  RATING_VALUES,
  AppRoute,
  AuthorizationStatus,
};
