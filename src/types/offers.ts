import { CITY_NAMES } from '../const';
import type { ActiveMapMarkerId } from './general';
import type { ErrorMessage } from './state';

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

/**
 * Зависит от константы { CITY_NAMES } from '../const';
 */
type CityName = (typeof CITY_NAMES)[number];

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

type OffersStateType = {
  city: CityName;
  activeMapMarkerId: ActiveMapMarkerId;

  isOffersDataLoading: boolean;
  offersErrorMessage: ErrorMessage;
  offers: Offers;

  groupedOffers: GroupedOffers;
  groupedFavoriteOffers: GroupedOffersByCity[];

  selectedOfferCityRequestId: OfferId | null;
};

type GroupedOffersByCity = {
  city: CityName;
  offerPlacesByCity: Offers;
};

export type {
  OfferType,
  OfferLocation,
  OfferId,
  GroupedOffers,
  Offer,
  Offers,
  OffersStateType,
  GroupedOffersByCity,
  CityName,
};
