import { IconOptions } from 'leaflet';
import pin from '/img/pin.svg';
import pinActive from '/img/pin-active.svg';

/** 100 / 5 = 20 (100 - 100% ширины элемента, а 5 - максимальное количество звезд.) */
const PERCENT_PER_STAR = 20;
const MIN_TEXTAREA_CHARACTERS = 50;
const MAX_NEAR_OFFERS = 3;
const INITIAL_STATE_CITY = 'Paris';

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

const enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer',
  NotFoundPage = '/not-found-page',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const PlacesSortingValue = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

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

// Map.
const MapConfig = {
  Tile: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  DefaultPosition: {
    Latitude: 0,
    Longitude: 0,
    Zoom: 10,
  },
} as const;

const CustomIcon: Record<'Default' | 'Active', IconOptions> = {
  Default: {
    iconUrl: pin,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  },
  Active: {
    iconUrl: pinActive,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  },
} as const;

export {
  INITIAL_STATE_CITY,
  ImageSize,
  CITY_NAMES,
  PERCENT_PER_STAR,
  RATING_VALUES,
  MIN_TEXTAREA_CHARACTERS,
  MAX_NEAR_OFFERS,
  MapConfig,
  CustomIcon,
  AppRoute,
  AuthorizationStatus,
  PlacesSortingValue,
};
