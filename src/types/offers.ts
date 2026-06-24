type CityName =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

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
