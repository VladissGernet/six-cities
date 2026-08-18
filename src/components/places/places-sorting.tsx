import { useState } from 'react';
import cn from 'classnames';
import { PlacesSortingValue } from '../../const';

export default function PlacesSorting(): JSX.Element {
  const sortingValues = Object.values(PlacesSortingValue);
  // По умолчанию ставлю самое первое значение (Popular).
  const [activeValue, setActiveValue] = useState(sortingValues[0]);
  // Остановился здесь
  // TODO, пример лучшей простой реализации:
  // https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/6/item/17
  // на 48:50

  // TODO, незабыть добавить document listner , чтобы закрывать по esc и клику на другом месте.
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingValues.map((value) => (
          <li
            key={value}
            className={cn(
              'places__option',
              activeValue === value && 'places__option--active',
            )}
            tabIndex={0}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}
