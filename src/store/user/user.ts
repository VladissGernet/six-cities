import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthenticationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

import type { UserStateType } from '../../types/user-data';

const initialState: UserStateType = {
  authErrorMessage: null,
  authenticationStatus: AuthenticationStatus.Unknown,
  userAccountData: null,
};

const ErrorMessages = {
  Authentication:
    'Unable to connect to the server for authentication. Check your connection.',
  AuthServerHTTP: 'Server returned HTTP',
  AuthFailed: 'Failed to check authentication.',
};

const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Check auth status.
      .addCase(checkAuthAction.pending, (state) => {
        state.authenticationStatus = AuthenticationStatus.Loading;
        state.authErrorMessage = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.authenticationStatus = AuthenticationStatus.Auth;
        state.userAccountData = payload;
      })
      .addCase(checkAuthAction.rejected, (state, { payload, error }) => {
        // Ошибка не требующая уведомления пользователя.
        if (payload?.kind === 'unauthorized') {
          state.authenticationStatus = AuthenticationStatus.NoAuth;
          state.userAccountData = null;
          return;
        }
        state.authenticationStatus = AuthenticationStatus.Error;

        if (payload?.kind === 'transport') {
          state.authErrorMessage = ErrorMessages.Authentication;
          return;
        }

        if (payload?.kind === 'http') {
          state.authErrorMessage = `${ErrorMessages.AuthServerHTTP} ${payload.status}.`;
          return;
        }

        state.authErrorMessage = error.message || ErrorMessages.AuthFailed;
      })

      // Login action.
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.authenticationStatus = AuthenticationStatus.Auth;
        state.userAccountData = payload;
      })

      // Logout action.
      .addCase(logoutAction.fulfilled, (state) => {
        state.authenticationStatus = AuthenticationStatus.NoAuth;
        state.userAccountData = null;
      });
  },
});

export { user };
