import { useEffect, useRef } from 'react';
import { renderMapMarkersLayer } from './offers-map.helper';

import type {
  Offers,
  OfferId,
  OfferLocation,
  MapWithLayer,
} from '../../types/offers';

import type { Marker } from 'leaflet';

type UseMarkersProps = {
  offersMap: MapWithLayer;
  offers?: Offers;
  selectedMarkerLocation?: OfferLocation;
};

const useMarkers = ({
  offersMap,
  offers,
  selectedMarkerLocation,
}: UseMarkersProps) => {
  const { map, mapLayerGroup } = offersMap;

  const markersRef = useRef(new Map<OfferId, Marker>());

  useEffect(() => {
    if (!map || !mapLayerGroup) {
      return;
    }

    // Очищает карту от маркеров.
    mapLayerGroup.clearLayers();

    markersRef.current = renderMapMarkersLayer({
      offers,
      layerGroup: mapLayerGroup,
      selectedMarkerLocation,
    });
  }, [map, mapLayerGroup, offers, selectedMarkerLocation]);

  return markersRef.current;
};

export { useMarkers };
