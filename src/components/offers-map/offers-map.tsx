// General.
import cn from 'classnames';
import { useRef } from 'react';

// Hooks.
import { useAppSelector } from '../../hooks/redux';
import { useOffersMap } from '../../hooks/offers-map/use-offers-map';
import { useMarkers } from '../../hooks/offers-map/use-markers';

// Types.
import type { OfferId, OfferLocation, Offers } from '../../types/offers';
import type { ActiveMapMarkerId } from '../../types/general';

// Store.
import { getActiveMapMarkerId } from '../../store/offers/offers-selectors';

// Leaflet.
import 'leaflet/dist/leaflet.css';

type OffersMapProps = {
  rootClassName: string;
  /** Только определенные предложения. */
  offers: Offers;
  selectedMarkerLocation?: OfferLocation;
};

export default function OffersMap({
  rootClassName,
  offers,
  selectedMarkerLocation,
}: OffersMapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const firstPlace = offers[0];
  const cityLocation = firstPlace?.city.location;

  const { latitude, longitude, zoom } = cityLocation;

  const mapContainerRef = useRef<HTMLElement | null>(null);
  // TODO, расммотреть улучшение для смены города через map.setView().
  const offersMap = useOffersMap({
    mapContainerRef,
    latitude,
    longitude,
    zoom,
  });

  // Получение id для выделения точки на карте.
  const activeMarkerId = useAppSelector<ActiveMapMarkerId>(
    getActiveMapMarkerId,
  ) as OfferId;

  // Очистка и добавление меток на карту.
  useMarkers({
    offersMap,
    activeMarkerId,
    offers,
    selectedMarkerLocation,
  });

  return offers?.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapContainerRef} />
  ) : null;
}
