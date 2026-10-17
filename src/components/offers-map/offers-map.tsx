// General.
import cn from 'classnames';
import { useRef } from 'react';

// Hooks.
import { useAppSelector } from '../../hooks/redux';
import useOffersMap from '../../hooks/offers-map/use-offers-map';

// Types.
import type { OfferLocation, Offers } from '../../types/offers';
import type { ActiveMapMarkerId, MapMarkers } from '../../types/general';

// Leaflet.
import 'leaflet/dist/leaflet.css';

import { renderMapMarkersLayer } from './offers-map.helper';
import { getActiveMapMarkerId } from '../../store/offers/offers-selectors';

type OffersMapProps = {
  rootClassName: string;
  groupedPlaces: Offers;
  selectedMarkerLocation?: OfferLocation;
};

export default function OffersMap({
  rootClassName,
  groupedPlaces,
  selectedMarkerLocation,
}: OffersMapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = groupedPlaces[0].city.location;

  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapMarkersRef = useRef<MapMarkers>(new Map());

  const map = useOffersMap({
    mapContainerRef,
    latitude,
    longitude,
    zoom,
    groupedPlaces,
  });

  const activeMarkerId =
    useAppSelector<ActiveMapMarkerId>(getActiveMapMarkerId);

  renderMapMarkersLayer(
    groupedPlaces,
    map,
    mapMarkersRef.current,
    activeMarkerId,
    selectedMarkerLocation,
  );

  return groupedPlaces?.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapContainerRef} />
  ) : null;
}
