import { useState, MouseEventHandler } from 'react';
import { PlacesSortingValue } from '../../const';
import { PlacesSortingValueType } from '../../types/general';

type PlacesSortingTypes = {
  activeOption: PlacesSortingValueType;
  setActiveOption: (value: PlacesSortingValueType) => void;
};

export default function PlacesSorting({
  activeOption,
  setActiveOption,
}: PlacesSortingTypes): JSX.Element {
  const sortingValues = Object.values(PlacesSortingValue);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const selectedPointClickHandler: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    if (!isMenuOpened) {
      setIsMenuOpened(true);
    }
  };
  const optionClickHandler = (optionValue: PlacesSortingValueType) => {
    if (optionValue === activeOption) {
      return;
    }

    setActiveOption(optionValue);
    setIsMenuOpened(false);
  };
  // Остановился здесь
  // TODO, пример лучшей простой реализации:
  // https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/6/item/17
  // на 48:50

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={selectedPointClickHandler}
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
            onClick={() => optionClickHandler(sortingValue)}
          >
            {sortingValue}
          </li>
        ))}
      </ul>
    </form>
  );
}
