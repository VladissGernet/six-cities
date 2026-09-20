import { RATING_VALUES, PlacesSortingValue } from '../const';

export type ImageSizes = {
  imageSizes: {
    width: number;
    height: number;
  };
};

export type PlacesSortingValueType =
  (typeof PlacesSortingValue)[keyof typeof PlacesSortingValue];

/**
 * Зависит от константы { RATING_VALUES } from '../const';
 */
export type RatingValue = (typeof RATING_VALUES)[number];

export type ActiveMapMarkerId = null | string;
