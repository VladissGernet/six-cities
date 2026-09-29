import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { AuthorizationStatus } from '../const';
import LoadingScreen from '../pages/loading-screen/loading-screen';

/**
 * Обертка для выноса логики загрузки и авторизации из компонента App.
 * Позволяет использовать хуки из react-router-dom (например, Outlet)
 * и при этом показывать LoadingScreen до тех пор, пока данные не загрузятся.
 */
export default function AppLayout(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );
  const isQuestionsDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading,
  );

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isQuestionsDataLoading
  ) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
