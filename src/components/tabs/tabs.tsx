import cn from 'classnames';
import { CITY_NAMES } from '../../const';

// TODO, Заглушка для рендера
const DEFAULT_CITY = 'Paris'; // Дефолтный первый активный город.

export default function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITY_NAMES.map((city) => {
            const isActive = city === DEFAULT_CITY;
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
