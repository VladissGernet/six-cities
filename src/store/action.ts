import { createAction } from '@reduxjs/toolkit';

import type { CityName } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { AppRoute, AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);

export const requireAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/requireAuthorizationStatus',
);

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export const setUserAccountData = createAction<UserData | null>(
  'user/setUserAccountData',
);
