import { useEffect, useRef } from 'react';
import {
  renderMapMarkersLayer,
  type MapMarkersResult,
} from './offers-map.helper';

import type { Offers, OfferLocation, MapWithLayer } from '../../types/offers';

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

  const markersRef = useRef<MapMarkersResult | null>(null);

  useEffect(() => {
    if (!map || !mapLayerGroup) {
      return;
    }

    // Очищает карту от маркеров.
    mapLayerGroup.clearLayers();

    const markers = renderMapMarkersLayer({
      offers,
      layerGroup: mapLayerGroup,
      selectedMarkerLocation,
    });

    markersRef.current = markers;
  }, [map, mapLayerGroup, offers, selectedMarkerLocation]);

  return markersRef.current;
};

export { useMarkers };
