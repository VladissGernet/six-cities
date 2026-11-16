import { useMemo, useRef, useState } from 'react';

import type { MouseEventHandler } from 'react';
import type { PlacesSortingValueType } from '../../types/general';

import { isPlacesSortingValue, sortingValues } from './places.helper';
import { useSortingMenu } from '../../hooks/places/use-sorting-menu';

type PlacesSortingTypes = {
  activeOption: PlacesSortingValueType;
  setActiveOption: (value: PlacesSortingValueType) => void;
};

type SortingOptionTypes = {
  activeOption: PlacesSortingValueType;
  sortingValue: PlacesSortingValueType;
};

function SortingOption({ sortingValue, activeOption }: SortingOptionTypes) {
  return (
    <li
      className={`places__option ${
        sortingValue === activeOption ? 'places__option--active' : ''
      }`}
      tabIndex={0}
      data-value={sortingValue}
    >
      {sortingValue}
    </li>
  );
}

export default function PlacesSorting({
  activeOption,
  setActiveOption,
}: PlacesSortingTypes): JSX.Element {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const menuRef = useRef<null | HTMLSpanElement>(null);
  useSortingMenu(menuRef, setIsMenuOpened);

  const handleSelectClick: MouseEventHandler<HTMLSpanElement> = () =>
    setIsMenuOpened((lastOpened) => !lastOpened);

  const handleOptionClick: MouseEventHandler<HTMLUListElement> = (evt) => {
    const optionElement = (evt.target as HTMLElement).closest<HTMLLIElement>(
      '[data-value]',
    );
    const optionValue = optionElement?.dataset.value;

    if (
      !optionValue ||
      !isPlacesSortingValue(optionValue) ||
      optionValue === activeOption
    ) {
      return;
    }

    setActiveOption(optionValue);
    setIsMenuOpened(false);
  };

  // Использую useMemo только с целью практики.
  const optionList = useMemo(
    () =>
      sortingValues.map((sortingValue) => (
        <SortingOption
          key={sortingValue}
          sortingValue={sortingValue}
          activeOption={activeOption}
        />
      )),
    [activeOption],
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        ref={menuRef}
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSelectClick}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isMenuOpened ? 'places__options--opened' : ''
        }`}
        onClick={handleOptionClick}
      >
        {optionList}
      </ul>
    </form>
  );
}
