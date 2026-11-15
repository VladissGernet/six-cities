import { useEffect, useRef } from 'react';

import { selectedCustomIcon, defaultCustomIcon } from './offers-map.helper';

import type { MapMarkersResult } from './offers-map.helper';
import type { OfferId } from '../../types/offers';
import type { Marker } from 'leaflet';

type ActiveMarker = {
  markers: MapMarkersResult | null;
  activeMarkerId: OfferId;
};

const useActiveMarker = ({ markers, activeMarkerId }: ActiveMarker): void => {
  const prevActiveMarker = useRef<Marker | null | undefined>(null);

  useEffect(() => {
    if (!markers) {
      return;
    }

    const { markersMap, selectedMarker } = markers;

    // Управление иконкой выбранного предложения.
    selectedMarker?.setIcon(
      !activeMarkerId && prevActiveMarker.current
        ? selectedCustomIcon
        : defaultCustomIcon,
    );

    // Управление иконкой маркера при наведении.
    prevActiveMarker.current?.setIcon(defaultCustomIcon);

    const activeMarker = markersMap.get(activeMarkerId);
    activeMarker?.setIcon(selectedCustomIcon);

    prevActiveMarker.current = activeMarker ?? null;
  }, [markers, activeMarkerId]);
};

export { useActiveMarker };
