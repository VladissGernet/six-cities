import { createAction } from '@reduxjs/toolkit';

import type { CityName } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { AppRoute, AuthenticationStatus } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);

export const requireAuthenticationStatus = createAction<AuthenticationStatus>(
  'user/requireAuthenticationStatus',
);

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export const setUserAccountData = createAction<UserData | null>(
  'user/setUserAccountData',
);
