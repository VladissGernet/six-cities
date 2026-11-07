import { RATING_VALUES, PlacesSortingValue } from '../const';

type ImageSizes = {
  imageSizes: {
    width: number;
    height: number;
  };
};

type PlacesSortingValueType =
  (typeof PlacesSortingValue)[keyof typeof PlacesSortingValue];

/**
 * Зависит от константы { RATING_VALUES } from '../const';
 */
type RatingValue = (typeof RATING_VALUES)[number];

type ActiveMapMarkerId = null | string;

export type {
  ImageSizes,
  PlacesSortingValueType,
  RatingValue,
  ActiveMapMarkerId,
};
