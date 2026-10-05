// General.
import cn from 'classnames';
import { useRef } from 'react';
import { CustomIcon } from '../../const';

// Hooks.
import { useAppSelector } from '../../hooks/redux';
import useOffersMap from '../../hooks/offers-map/use-offers-map';

// Types.
import type { Offers } from '../../types/offers';
import type { ActiveMapMarkerId } from '../../types/general';

// Leaflet.
import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type offerId = string;

type OffersMapProps = {
  rootClassName: string;
  groupedPlaces: Offers;
};

const defaultCustomIcon = new Icon(CustomIcon.Default);
const selectedCustomIcon = new Icon(CustomIcon.Active);

export default function OffersMap({
  rootClassName,
  groupedPlaces,
}: OffersMapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = groupedPlaces[0].city.location;

  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapMarkersRef = useRef<Map<offerId, Marker>>(new Map());

  const map = useOffersMap({
    mapContainerRef,
    latitude,
    longitude,
    zoom,
    groupedPlaces,
  });

  const activeMarkerId = useAppSelector<ActiveMapMarkerId>(
    (state) => state.activeMapMarkerId,
  );

  // TODO, вынести этот участок кода как-нибудь в другое место.
  if (map) {
    mapMarkersRef.current.clear();
    const markerLayer = layerGroup();

    groupedPlaces.forEach(({ location, id }) => {
      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude,
      });

      mapMarkersRef.current.set(id, marker);

      if (id === activeMarkerId) {
        marker.setIcon(selectedCustomIcon);
      } else {
        marker.setIcon(defaultCustomIcon);
      }
      marker.addTo(markerLayer);
    });

    markerLayer.addTo(map);
  }

  return groupedPlaces?.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapContainerRef} />
  ) : null;
}
