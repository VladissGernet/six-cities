import type { State } from '../../types/state';

const getUserAccountData = (state: State) => state.userAccountData;
const getAuthenticationStatus = (state: State) => state.authenticationStatus;
const getActiveMapMarkerId = (state: State) => state.activeMapMarkerId;
const getCity = (state: State) => state.city;

export {
  getCity,
  getUserAccountData,
  getAuthenticationStatus,
  getActiveMapMarkerId,
};
