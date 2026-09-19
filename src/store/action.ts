import { createAction } from '@reduxjs/toolkit';
import { CityName, Offers } from '../types/offers';
import { ActiveMapMarkerId } from '../types/general';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/requireAuthorizationStatus',
);
