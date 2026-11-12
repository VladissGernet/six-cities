enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer',
  NotFoundPage = '/not-found-page',
}

enum AuthenticationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
  Loading = 'LOADING',
  Error = 'ERROR',
}

enum NameSpace {
  Offers = 'OFFERS',
  SelectedOffer = 'SELECTED_OFFER',
  SelectedOfferComments = 'SELECTED_OFFER_COMMENTS',
  SelectedOfferNearby = 'SELECTED_OFFER_NEARBY',
  User = 'USER',
}

const ImageSize = {
  Places: {
    width: 260,
    height: 200,
  },
  Favorites: {
    width: 150,
    height: 110,
  },
} as const;

// Sorting.
const PlacesSortingValue = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

/**
 * Ещё создаёт тип { CityName } from "./types/offers".
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
 * Ещё создаёт тип { RatingValue } from "./types/general".
 */
const RATING_VALUES = [1, 2, 3, 4, 5] as const;

const MAX_SELECTED_OFFER_PLACES = 3;

export {
  AppRoute,
  AuthenticationStatus,
  NameSpace,
  ImageSize,
  CITY_NAMES,
  RATING_VALUES,
  PlacesSortingValue,
  MAX_SELECTED_OFFER_PLACES,
};
