import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppRoute, AuthenticationStatus } from '../const';
import {
  redirectToRoute,
  requireAuthenticationStatus,
  setUserAccountData,
} from './action';
import { dropToken, saveToken } from '../services/token';

import type { AppDispatch } from '../types/state';
import { type ExtraOffer, type OfferId, type Offers } from '../types/offers';
import type { AuthData } from '../types/auth-data';
import type { ExtraUserData } from '../types/user-data';

enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

// TODO, заменить export на один в конце export { fetchOffersAction , ...}

export const fetchOffersAction = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const fetchExtraOfferAction = createAsyncThunk<
  ExtraOffer,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchExtraOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<ExtraOffer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchNearbyOffers = createAsyncThunk<
  Offers,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchNearbyOffers', async (offerId, { extra: api }) => {
  // TODO, спросить нейронку, правильно ли я реализовываю без try , как в checkAuthAction?
  const { data } = await api.get<Offers>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`,
  );
  return data;
});

// TODO, закончить запрос на комметы.
// export const fetchComments = createAsyncThunk<

export const checkAuthAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<ExtraUserData>(APIRoute.Login);
    dispatch(requireAuthenticationStatus(AuthenticationStatus.Auth));
    dispatch(setUserAccountData(data));
  } catch {
    dispatch(requireAuthenticationStatus(AuthenticationStatus.NoAuth));
    dispatch(setUserAccountData(null));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<ExtraUserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(setUserAccountData(data));
    dispatch(requireAuthenticationStatus(AuthenticationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setUserAccountData(null));
  dispatch(requireAuthenticationStatus(AuthenticationStatus.NoAuth));
});
