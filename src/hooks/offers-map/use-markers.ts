import { useEffect, useRef } from 'react';
import { renderMapMarkersLayer } from './offers-map.helper';

import type { UseOffersMapResult } from './use-offers-map';
import type { Offers, OfferId, OfferLocation } from '../../types/offers';
import type { Marker } from 'leaflet';

type UseMarkersProps = {
  offersMap: UseOffersMapResult;
  activeMarkerId: OfferId;
  offers?: Offers;
  selectedMarkerLocation?: OfferLocation;
};

const useMarkers = ({
  offersMap,
  activeMarkerId,
  offers,
  selectedMarkerLocation,
}: UseMarkersProps) => {
  const { map, mapLayerGroup } = offersMap;

  const markersRef = useRef(new Map<OfferId, Marker>());
  const selectedMarkerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (!map || !mapLayerGroup) {
      return;
    }
    // TODO, реализовать замену отображения иконки карты, чтобы не рендерить сразу
    // все точки заново https://www.perplexity.ai/session/32fa83dd-e3db-41e3-b330-f23a634fad36
    mapLayerGroup.clearLayers();

    renderMapMarkersLayer({
      offers,
      layerGroup: mapLayerGroup,
      activeMarkerId,
      selectedMarkerLocation,
    });
  }, [map, mapLayerGroup, activeMarkerId, offers, selectedMarkerLocation]);
};

export { useMarkers };
