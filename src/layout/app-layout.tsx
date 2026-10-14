import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { AuthenticationStatus } from '../const';
import LoadingScreen from '../pages/loading-screen/loading-screen';
import {
  getAuthenticationStatus,
  getIsOffersDataLoading,
} from '../store/offers/offers-selectors';

/**
 * Обертка для выноса логики загрузки и авторизации из компонента App.
 * Позволяет использовать хуки из react-router-dom (например, Outlet)
 * и при этом показывать LoadingScreen до тех пор, пока данные не загрузятся.
 */
export default function AppLayout(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const isQuestionsDataLoading = useAppSelector(getIsOffersDataLoading);

  if (
    authenticationStatus === AuthenticationStatus.Unknown ||
    isQuestionsDataLoading
  ) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
