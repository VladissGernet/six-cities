import { useEffect, useRef } from 'react';

import { selectedCustomIcon, defaultCustomIcon } from './offers-map.helper';

import type { renderMapMarkersLayer } from './offers-map.helper';
import type { OfferId } from '../../types/offers';
import type { Marker } from 'leaflet';

import { useAppSelector } from '../redux';
import { getSelectedOffer } from '../../store/selected-offer/selected-offer.selectors';

type ActiveMarker = {
  markers: ReturnType<typeof renderMapMarkersLayer>;
  activeMarkerId: OfferId;
};

const useActiveMarker = ({ markers, activeMarkerId }: ActiveMarker): void => {
  const selectedOffer = useAppSelector(getSelectedOffer);

  const prevActiveMarker = useRef<Marker | null | undefined>(null);

  useEffect(() => {
    // TODO, реализовать получение маркера от selectedOffer.
    // Возможно нужно прокидывать marker через renderMapMarkersLayer.
    console.log(selectedOffer);

    prevActiveMarker.current?.setIcon(defaultCustomIcon);

    const activeMarker = markers.get(activeMarkerId);
    activeMarker?.setIcon(selectedCustomIcon);

    prevActiveMarker.current = activeMarker;
  }, [markers, activeMarkerId, selectedOffer]);
};

export { useActiveMarker };
