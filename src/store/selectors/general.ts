import type { State } from '../../types/state';

const getActiveMapMarkerId = (state: State) => state.activeMapMarkerId;
const getCity = (state: State) => state.city;

export { getCity, getActiveMapMarkerId };
