import { Icon } from 'leaflet';
import cn from 'classnames';
import { useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offers';
import { CUSTOM_ICON } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  offers: Offers;
};

const defaultCustomIcon = new Icon(CUSTOM_ICON.DEFAULT);

const currentCustomIcon = new Icon(CUSTOM_ICON.ACTIVE);

export default function Map({ rootClassName, offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const { latitude, longitude, zoom } = offers[0].city.location;

  const map = useMap({ mapRef, latitude, longitude, zoom });
  // TODO повторить
  // https://chat.deepseek.com/a/chat/s/b884eea1-7f8a-47ac-849e-643c5e1b3117
  console.log(map, 'mapInstance');

  return <section className={cn(rootClassName, 'map')} ref={mapRef} />;
}
