import { MouseEvent } from 'react';
import { CITY_NAMES } from '../../const';

import { CityName } from '../../types/offers';
import { AppDispatch } from '../../types/state';

import { changeCity } from '../../store/action';

function isCityName(value: string): value is CityName {
  return CITY_NAMES.includes(value as CityName);
}

export default function createHandleCityClick(
  currentCity: CityName,
  dispatch: AppDispatch,
) {
  return function handleClick(e: MouseEvent<HTMLUListElement>) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (!link) {
      return;
    }

    const selectedCity = link.querySelector('span')?.textContent?.trim();
    if (selectedCity === currentCity) {
      return;
    }

    if (selectedCity && isCityName(selectedCity)) {
      dispatch(changeCity(selectedCity));
    }
  };
}
