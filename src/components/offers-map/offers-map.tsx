import cn from 'classnames';
import { useRef } from 'react';
import useMap from '../../hooks/offers-map/use-offers-map';
import { Offers } from '../../types/offers';

import 'leaflet/dist/leaflet.css';
import { CustomIcon } from '../../const';
import { Icon, layerGroup, Marker } from 'leaflet';
import { useAppSelector } from '../../hooks/redux';
import { ActiveMapMarkerId } from '../../types/general';

type OffersMapProps = {
  rootClassName: string;
  groupedPlaces: Offers;
};

const defaultCustomIcon = new Icon(CustomIcon.Default);
const currentCustomIcon = new Icon(CustomIcon.Active);

export default function OffersMap({
  rootClassName,
  groupedPlaces,
}: OffersMapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = groupedPlaces[0].city.location;

  const mapRef = useRef<HTMLElement | null>(null);
  const mapMarkersRef = useRef<Map<string, Marker>>(new Map());

  const map = useMap({
    mapRef,
    latitude,
    longitude,
    zoom,
    groupedPlaces,
  });

  if (map) {
    mapMarkersRef.current.clear();
    const markerLayer = layerGroup();
    groupedPlaces.forEach(({ location, id }) => {
      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude,
      });

      mapMarkersRef.current.set(id, marker);
      marker.setIcon(defaultCustomIcon).addTo(markerLayer);
    });

    markerLayer.addTo(map);
  }

  const activeMarkerId = useAppSelector<ActiveMapMarkerId>(
    (state) => state.activeMapMarkerId,
  );

  if (mapMarkersRef.current && activeMarkerId) {
    const selectedMarker = mapMarkersRef.current.get(activeMarkerId);
    selectedMarker?.setIcon(currentCustomIcon);
  }

  return groupedPlaces?.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapRef} />
  ) : null;
}
