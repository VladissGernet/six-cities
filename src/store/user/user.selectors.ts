import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const getUserAccountData = (state: State) =>
  state[NameSpace.User].userAccountData;
const getAuthenticationStatus = (state: State) =>
  state[NameSpace.User].authenticationStatus;
const getAuthErrorMessage = (state: State) =>
  state[NameSpace.User].authErrorMessage;

export { getAuthenticationStatus, getAuthErrorMessage, getUserAccountData };
