import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

import type { CityName, Offers } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { StateError } from '../types/state';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/requireAuthorizationStatus',
);

export const setError = createAction<StateError>('data/setError');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus',
);
