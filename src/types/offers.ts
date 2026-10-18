import { CITY_NAMES } from '../const';

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: CityName;
  location: OfferLocation;
};

export type OfferId = string;

export type GroupedOffers = Partial<Record<CityName, Offers>>;

export type Offer = {
  id: OfferId;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offers = Offer[];

export type GroupedOffersByCity = {
  city: CityName;
  offerPlacesByCity: Offers;
};

/**
 * Зависит от константы { CITY_NAMES } from '../const';
 */
export type CityName = (typeof CITY_NAMES)[number];
