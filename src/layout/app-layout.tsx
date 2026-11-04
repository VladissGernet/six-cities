import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { AuthenticationStatus } from '../const';
import LoadingScreen from '../pages/loading-screen/loading-screen';

// Selectors.
import { getIsOffersDataLoading } from '../store/selectors/offers';
import { getAuthenticationStatus } from '../store/selectors/general';

/**
 * Обертка для выноса логики загрузки и авторизации из компонента App.
 * Позволяет использовать хуки из react-router-dom (например, Outlet)
 * и при этом показывать LoadingScreen до тех пор, пока данные не загрузятся.
 */
export default function AppLayout(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  if (
    authenticationStatus === AuthenticationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
