import cn from 'classnames';
import { useRef } from 'react';
import useMap from '../../hooks/map/use-map';
import useMapMarkerLayer from '../../hooks/map/use-map-marker-layer';
import { Offers, Location } from '../../types/offers';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  /**Сгруппированные в массив места по выбранному городу. */
  groupedPlaces: Offers;
  selectedOfferLocation?: Location | null;
};

export default function Map({
  rootClassName,
  groupedPlaces,
  selectedOfferLocation = null,
}: MapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = groupedPlaces[0].city.location;

  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap({ mapRef, latitude, longitude, zoom });
  useMapMarkerLayer(map, groupedPlaces, selectedOfferLocation);

  return groupedPlaces?.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapRef} />
  ) : null;
}
