import { CITY_NAMES } from '../const';

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: CityName;
  location: Location;
};

export type GroupedOffers = Map<CityName, Offer[]>;

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offers = Offer[];

export type GroupedOffersByCity = {
  city: CityName;
  cities: Offers;
};

/**
 * Зависит от константы { CITY_NAMES } from '../const';
 */
export type CityName = (typeof CITY_NAMES)[number];
