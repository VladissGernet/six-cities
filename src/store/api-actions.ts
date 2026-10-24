import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppRoute } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';

import type { AppDispatch } from '../types/state';
import {
  type Comments,
  type ExtraOffer,
  type OfferId,
  type Offers,
} from '../types/offers';
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
  const { data } = await api.get<Offers>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`,
  );
  return data;
});

export const fetchComments = createAsyncThunk<
  Comments,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchOfferComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

/* TODO.
  Небольшой нюанс
  Не путай checkAuthAction.rejected с «пользователь точно не авторизован». rejected означает, что запрос не удался: это может
  быть и 401, и сеть, и сервер. Для учебного приложения обычно этого достаточно, но в production-подходе ошибку лучше различать
  через rejectWithValue и, например, ставить NoAuth только при 401.
*/
export const checkAuthAction = createAsyncThunk<
  ExtraUserData,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<ExtraUserData>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<
  ExtraUserData,
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
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
