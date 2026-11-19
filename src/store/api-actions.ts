import { createAsyncThunk } from '@reduxjs/toolkit';
import { dropToken, saveToken } from '../services/token';
import { getApiError } from '../services/api-error';

// Types.
import type { AxiosInstance } from 'axios';
import type { DispatchFavoriteData, OfferId, Offers } from '../types/offers';
import type { AuthData } from '../types/auth-data';
import type {
  CommentForSending,
  Comments,
  ExtraUserData,
  UserComment,
} from '../types/user-data';
import type { ApiError } from '../services/api-error';
import type { SelectedOffer } from '../types/selected-offer';

enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

const fetchOffersAction = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

const fetchSelectedOfferAction = createAsyncThunk<
  SelectedOffer,
  OfferId,
  { extra: AxiosInstance }
>('data/fetchSelectedOffer', async (offerId, { extra: api, signal }) => {
  const { data } = await api.get<SelectedOffer>(
    `${APIRoute.Offers}/${offerId}`,
    {
      signal,
    },
  );
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

const sendCommentAction = createAsyncThunk<
  void,
  CommentForSending,
  { extra: AxiosInstance }
>('data/sendCommentAction', async ({ comment, rating, id }, { extra: api }) => {
  await api.post<UserComment>(`${APIRoute.Comments}/${id}`, {
    comment,
    rating,
  });
});

const checkAuthAction = createAsyncThunk<
  ExtraUserData,
  void,
  {
    extra: AxiosInstance;
    rejectValue: ApiError;
  }
>('user/checkAuth', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<ExtraUserData>(APIRoute.Login);

    return data;
  } catch (error: unknown) {
    const apiError = getApiError(error);

    if (apiError) {
      return rejectWithValue(apiError);
    }

    throw error;
  }
});

const loginAction = createAsyncThunk<
  ExtraUserData,
  AuthData,
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<ExtraUserData>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  return data;
});

const logoutAction = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

const favoriteAction = createAsyncThunk<
  void,
  DispatchFavoriteData,
  { extra: AxiosInstance; rejectValue: ApiError }
>(
  'offer/favoriteAction',
  async ({ offerStatusCode, offerId }, { extra: api, rejectWithValue }) => {
    try {
      await api.post<DispatchFavoriteData>(
        `${APIRoute.Favorite}/${offerId}/${offerStatusCode}`,
      );
    } catch (error: unknown) {
      const apiError = getApiError(error);

      if (apiError) {
        return rejectWithValue(apiError);
      }

      throw error;
    }
  },
);

export {
  fetchOffersAction,
  fetchSelectedOfferAction,
  fetchNearbyOffers,
  fetchComments,
  checkAuthAction,
  loginAction,
  logoutAction,
  sendCommentAction,
  favoriteAction,
};
