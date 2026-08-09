import { Icon } from 'leaflet';
import cn from 'classnames';
import { useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offers';
import { CustomIcon } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  offers: Offers;
};

const defaultCustomIcon = new Icon(CustomIcon.Default);

const currentCustomIcon = new Icon(CustomIcon.Active);

export default function Map({
  rootClassName,
  offers,
}: MapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = offers[0].city.location;

  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap({ mapRef, latitude, longitude, zoom });
  console.log(map, 'mapInstance');

  return offers.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapRef} />
  ) : null;
}
