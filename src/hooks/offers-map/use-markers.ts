import { useEffect } from 'react';
import { renderMapMarkersLayer } from './offers-map.helper';
import type { UseOffersMapResult } from './use-offers-map';
import type { Offers, OfferId, OfferLocation } from '../../types/offers';

type UseMarkersProps = {
  offersMap: UseOffersMapResult;
  activeMarkerId: OfferId;
  offers: Offers;
  selectedMarkerLocation?: OfferLocation;
};

const useMarkers = ({
  offersMap,
  activeMarkerId,
  offers,
  selectedMarkerLocation,
}: UseMarkersProps) => {
  const { map, mapLayerGroup } = offersMap;
  useEffect(() => {
    if (!map || !mapLayerGroup) {
      return;
    }

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
