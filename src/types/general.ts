import { RATING_VALUES } from '../const';

export type ImageSizes = {
  imageSizes: {
    width: number;
    height: number;
  };
};

/**
 * Зависит от константы { RATING_VALUES } from '../const';
 */
export type RatingValue = (typeof RATING_VALUES)[number];
