import type { Offer, OfferId, Offers } from './offers';
import type { ErrorMessage } from './state';
import type { Comments, UserData } from './user-data';

type SelectedOfferGoods = string[];

type SelectedOfferImages = string[];

type RequestId = OfferId | null;

type SelectedOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: SelectedOfferGoods;
  host: UserData;
  images: SelectedOfferImages;
  maxAdults: number;
};

type SelectedOfferStateType = {
  selectedOffer: SelectedOffer | null;
  selectedOfferErrorMessage: ErrorMessage;
  isSelectedOfferLoading: boolean;
  selectedOfferRequestId: RequestId;
};

type SelectedOfferNearbyStateType = {
  nearbyOffers: Offers | null;
  nearbyErrorMessage: ErrorMessage;
  isNearbyLoading: boolean;
  nearbyOffersRequestId: RequestId;
};

type SelectedOfferCommentsStateType = {
  comments: Comments | null;
  commentsErrorMessage: ErrorMessage;
  isCommentsLoading: boolean;
  commentsRequestId: RequestId;
};

export type {
  SelectedOffer,
  SelectedOfferGoods,
  SelectedOfferImages,
  SelectedOfferStateType,
  SelectedOfferNearbyStateType,
  SelectedOfferCommentsStateType,
};
