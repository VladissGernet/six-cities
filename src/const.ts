const RATING_TO_PERCENT = 10;
const PLACES_IMAGE_SIZES = {
  width: 260,
  height: 200,
};
const FAVORITES_IMAGE_SIZES = {
  width: 150,
  height: 110,
};

const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = (typeof CITY_NAMES)[number];

export {
  RATING_TO_PERCENT,
  PLACES_IMAGE_SIZES,
  FAVORITES_IMAGE_SIZES,
  CITY_NAMES,
};
