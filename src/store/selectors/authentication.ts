import type { State } from '../../types/state';

const getUserAccountData = (state: State) => state.userAccountData;
const getAuthenticationStatus = (state: State) => state.authenticationStatus;
const getAuthErrorMessage = (state: State) => state.authErrorMessage;

export { getAuthenticationStatus, getAuthErrorMessage, getUserAccountData };
