import { useEffect, useRef } from 'react';

import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { AuthenticationStatus } from '../const';
import LoadingScreen from '../pages/loading-screen/loading-screen';

// Selectors.
import { getIsOffersDataLoading } from '../store/selectors/offers';
import {
  getAuthenticationStatus,
  getAuthErrorMessage,
} from '../store/selectors/authentication';
import { toast } from 'react-toastify';

/**
 * Обертка для выноса логики загрузки и авторизации из компонента App.
 * Позволяет использовать хуки из react-router-dom (например, Outlet)
 * и при этом показывать LoadingScreen до тех пор, пока данные не загрузятся.
 */
export default function AppLayout(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);
  const authErrorMessage = useAppSelector(getAuthErrorMessage);
  const authErrorToastShown = useRef(false);

  useEffect(() => {
    if (
      authenticationStatus !== AuthenticationStatus.Error ||
      !authErrorMessage
    ) {
      authErrorToastShown.current = false;
      return;
    }

    if (authErrorToastShown.current) {
      return;
    }

    authErrorToastShown.current = true;

    toast.warn(authErrorMessage);
  }, [authenticationStatus, authErrorMessage]);

  if (
    authenticationStatus === AuthenticationStatus.Unknown ||
    authenticationStatus === AuthenticationStatus.Loading ||
    isOffersDataLoading
  ) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
