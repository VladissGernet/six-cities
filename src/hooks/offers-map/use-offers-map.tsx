import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { OffersMapConfig } from '../../const';
import { Offers } from '../../types/offers';

type UseOffersMapProps = {
  mapContainerRef: MutableRefObject<HTMLElement | null>;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  groupedPlaces: Offers;
};

export default function useOffersMap({
  mapContainerRef,
  latitude = OffersMapConfig.DefaultPosition.Latitude,
  longitude = OffersMapConfig.DefaultPosition.Longitude,
  zoom = OffersMapConfig.DefaultPosition.Zoom,
  groupedPlaces,
}: UseOffersMapProps): Map | null {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  // Добавление карты.
  useEffect(() => {
    if (mapContainerRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapContainerRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      const layer = new TileLayer(OffersMapConfig.Tile, {
        attribution: OffersMapConfig.Attribution,
      });

      instance.addLayer(layer);
      setMapInstance(instance);
      isRenderedRef.current = true;

      return () => {
        instance.remove();
        setMapInstance(null);
        isRenderedRef.current = false;
      };
    }
  }, [mapContainerRef, latitude, longitude, zoom, groupedPlaces]);

  return mapInstance;
}
