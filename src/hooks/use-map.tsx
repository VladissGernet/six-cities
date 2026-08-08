import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { MAP_CONFIG } from '../const';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function useMap({
  mapRef,
  latitude,
  longitude,
  zoom,
}: UseMapProps): Map | null {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  // Добавление карты.
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      const layer = new TileLayer(MAP_CONFIG.TILE, {
        attribution: MAP_CONFIG.ATTRIBUTION,
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
  }, [mapRef, latitude, longitude, zoom]);

  return mapInstance;
}
