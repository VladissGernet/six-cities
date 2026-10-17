import { useEffect, useRef, useState } from 'react';
import { PlacesSortingValue } from '../../const';

import type { PlacesSortingValueType } from '../../types/general';

type PlacesSortingTypes = {
  activeOption: PlacesSortingValueType;
  setActiveOption: (value: PlacesSortingValueType) => void;
};

export default function PlacesSorting({
  activeOption,
  setActiveOption,
}: PlacesSortingTypes): JSX.Element {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const menuRef = useRef<null | HTMLSpanElement>(null);
  const sortingValues = Object.values(PlacesSortingValue);

  const handleOptionClick = (optionValue: PlacesSortingValueType) => {
    if (optionValue === activeOption) {
      return;
    }

    setActiveOption(optionValue);
    setIsMenuOpened(false);
  };

  // Закрытие меню при клике за пределами селектов.
  useEffect(() => {
    const hideMenu = (evt: MouseEvent) => {
      if (
        evt.target instanceof HTMLElement &&
        menuRef.current &&
        !menuRef.current.contains(evt.target)
      ) {
        setIsMenuOpened(false);
      }
    };
    document.addEventListener('click', hideMenu);
    return () => {
      document.removeEventListener('click', hideMenu);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        ref={menuRef}
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsMenuOpened((lastOpened) => !lastOpened)}
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
      >
        {sortingValues.map((sortingValue) => (
          <li
            className={`places__option ${
              sortingValue === activeOption ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            key={sortingValue}
            onClick={() => handleOptionClick(sortingValue)}
          >
            {sortingValue}
          </li>
        ))}
      </ul>
    </form>
  );
}
