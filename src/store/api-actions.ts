import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppRoute } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';

import type { AxiosInstance } from 'axios';
import type { AppDispatch } from '../types/state';
import {
  type Comments,
  type ExtraOffer,
  type OfferId,
  type Offers,
} from '../types/offers';
import type { AuthData } from '../types/auth-data';
import type { ExtraUserData } from '../types/user-data';
import { StatusCodes } from 'http-status-codes';

enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

const CHECK_AUTH_REJECT_VALUE = {
  UNAUTHORIZED: { kind: 'unauthorized' },
  TRANSPORT: { kind: 'transport' },
} as const;

// TODO, остановился на замечания 2.4. Обрати внимание на loginAction

/**
  unauthorized — сервер ответил 401;
  transport — не получили HTTP-ответ (например, потеря сети);
  http — получили другой ошибочный HTTP-статус.
 */
type CheckAuthRejectValue =
  | typeof CHECK_AUTH_REJECT_VALUE.UNAUTHORIZED
  | typeof CHECK_AUTH_REJECT_VALUE.TRANSPORT
  | { kind: 'http'; status: number };

const fetchOffersAction = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

const fetchExtraOfferAction = createAsyncThunk<
  ExtraOffer,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchExtraOffer', async (offerId, { extra: api, signal }) => {
  const { data } = await api.get<ExtraOffer>(`${APIRoute.Offers}/${offerId}`, {
    signal,
  });
  return data;
});

const fetchNearbyOffers = createAsyncThunk<
  Offers,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchNearbyOffers', async (offerId, { extra: api, signal }) => {
  const { data } = await api.get<Offers>(
    `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`,
    { signal },
  );
  return data;
});

const fetchComments = createAsyncThunk<
  Comments,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchOfferComments', async (offerId, { extra: api, signal }) => {
  const { data } = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`, {
    signal,
  });
  return data;
});

const checkAuthAction = createAsyncThunk<
  ExtraUserData,
  void,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
    rejectValue: CheckAuthRejectValue;
  }
>('user/checkAuth', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<ExtraUserData>(APIRoute.Login);

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === StatusCodes.UNAUTHORIZED) {
        return rejectWithValue(CHECK_AUTH_REJECT_VALUE.UNAUTHORIZED);
      }

      if (status === undefined) {
        return rejectWithValue(CHECK_AUTH_REJECT_VALUE.TRANSPORT);
      }

      return rejectWithValue({
        kind: 'http',
        status,
      });
    }

    throw error;
  }
});

const loginAction = createAsyncThunk<
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
    // TODO, проверить на случай ошибки

    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

const logoutAction = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  // TODO, проверить на случай ошибки

  await api.delete(APIRoute.Logout);
  dropToken();
});

export {
  fetchOffersAction,
  fetchExtraOfferAction,
  fetchNearbyOffers,
  fetchComments,
  checkAuthAction,
  loginAction,
  logoutAction,
};
