import { CITY_NAMES } from '../const';
import type { UserData } from './user-data';

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: CityName;
  location: OfferLocation;
};

type OfferId = string;

type GroupedOffers = Partial<Record<CityName, Offers>>;

type Offer = {
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

type Offers = Offer[];

type GroupedOffersByCity = {
  city: CityName;
  offerPlacesByCity: Offers;
};

/**
 * Зависит от константы { CITY_NAMES } from '../const';
 */
type CityName = (typeof CITY_NAMES)[number];

type ExtraOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: ExtraOfferGoods;
  host: UserData;
  images: ExtraOfferImages;
  maxAdults: number;
};

type ExtraOfferGoods = string[];

type ExtraOfferImages = string[];

export type {
  OfferType,
  OfferLocation,
  OfferId,
  GroupedOffers,
  Offer,
  Offers,
  GroupedOffersByCity,
  CityName,
  ExtraOffer,
  ExtraOfferGoods,
  ExtraOfferImages,
};
