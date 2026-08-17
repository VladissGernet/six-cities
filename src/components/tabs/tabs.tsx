import cn from 'classnames';
import { CITY_NAMES } from '../../const';
import { useAppSelector } from '../../hooks/redux';
import createHandleCityClick from './tabs.handlers';

export default function Tabs(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const handleClick = createHandleCityClick(currentCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" onClick={handleClick}>
          {CITY_NAMES.map((city) => {
            const isActive = city === currentCity;
            const linkClassName = cn(
              'locations__item-link tabs__item',
              isActive && 'tabs__item--active',
            );

            return (
              <li key={city} className="locations__item">
                <a className={linkClassName} href="#">
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
