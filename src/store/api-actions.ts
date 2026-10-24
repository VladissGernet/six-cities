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

export const checkAuthAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  /* TODO.
      Для checkAuthAction можно убрать ручные dispatch(requireAuthenticationStatus(...)) и dispatch(setUserAccountData(...)),
      а статус и данные пользователя задавать в reducer через fulfilled и rejected. createAsyncThunk уже dispatch-ит pending,
      fulfilled и rejected, поэтому это более идиоматичный вариант.
      Текущий thunk возвращает void, поэтому reducer не получит данные пользователя. Нужно вернуть ExtraUserData из fulfilled.
      Здесь try/catch не нужен: если api.get упадёт, Redux Toolkit сам dispatch-ит rejected.

      Небольшой нюанс
      Не путай checkAuthAction.rejected с «пользователь точно не авторизован». rejected означает, что запрос не удался: это может
      быть и 401, и сеть, и сервер. Для учебного приложения обычно этого достаточно, но в production-подходе ошибку лучше различать
      через rejectWithValue и, например, ставить NoAuth только при 401.
    */
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
    /* TODO.
      Для checkAuthAction можно убрать ручные dispatch(requireAuthenticationStatus(...)) и dispatch(setUserAccountData(...)),
      а статус и данные пользователя задавать в reducer через fulfilled и rejected. createAsyncThunk уже dispatch-ит pending,
      fulfilled и rejected, поэтому это более идиоматичный вариант.
      saveToken, dropToken и dispatch(redirectToRoute(...)) лучше оставить внутри loginAction и logoutAction, потому что это побочные эффекты.
    */
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
  /* TODO.
      Для checkAuthAction можно убрать ручные dispatch(requireAuthenticationStatus(...)) и dispatch(setUserAccountData(...)),
      а статус и данные пользователя задавать в reducer через fulfilled и rejected. createAsyncThunk уже dispatch-ит pending,
      fulfilled и rejected, поэтому это более идиоматичный вариант.
      saveToken, dropToken и dispatch(redirectToRoute(...)) лучше оставить внутри loginAction и logoutAction, потому что это побочные эффекты.
    */
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setUserAccountData(null));
  dispatch(requireAuthenticationStatus(AuthenticationStatus.NoAuth));
});
