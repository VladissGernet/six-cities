import { createAction } from '@reduxjs/toolkit';

import type { CityName, Offers } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { AppRoute, AuthorizationStatus } from '../const';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/requireAuthorizationStatus',
);

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus',
);
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
