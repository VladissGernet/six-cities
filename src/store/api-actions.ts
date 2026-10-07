import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  redirectToRoute,
  requireAuthorizationStatus,
  setUserAccountData,
} from './action';
import { dropToken, saveToken } from '../services/token';

import type { AppDispatch } from '../types/state';
import type { Offers } from '../types/offers';
import type { AuthData } from '../types/auth-data';
import type { UserData } from '../types/user-data';

export const fetchOffersAction = createAsyncThunk<
  Offers,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserAccountData(data));
  } catch {
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
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
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });

    saveToken(data.token);
    dispatch(setUserAccountData(data));
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
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
  dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
});
