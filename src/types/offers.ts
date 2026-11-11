import { CITY_NAMES } from '../const';
import type { ActiveMapMarkerId } from './general';
import type { ErrorMessage } from './state';
import type { Comments, UserData } from './user-data';

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

type RequestId = OfferId | null;

type OffersStateType = {
  city: CityName;
  activeMapMarkerId: ActiveMapMarkerId;

  isOffersDataLoading: boolean;
  offersErrorMessage: ErrorMessage;
  offers: Offers;

  groupedOffers: GroupedOffers;
  groupedFavoriteOffers: GroupedOffersByCity[];

  extraOfferCityRequestId: RequestId;
};

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

type ExtraOfferStateType = {
  extraOffer: ExtraOffer | null;
  extraOfferErrorMessage: ErrorMessage;
  isExtraOfferLoading: boolean;
  extraOfferRequestId: RequestId;

  // NearbyOffers.
  nearbyOffers: Offers | null;
  nearbyErrorMessage: ErrorMessage;
  isNearbyLoading: boolean;
  nearbyOffersRequestId: RequestId;

  // Comments.
  comments: Comments | null;
  commentsErrorMessage: ErrorMessage;
  isCommentsLoading: boolean;
  commentsRequestId: RequestId;
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
  ExtraOffer,
  ExtraOfferGoods,
  ExtraOfferImages,
  ExtraOfferStateType,
};
