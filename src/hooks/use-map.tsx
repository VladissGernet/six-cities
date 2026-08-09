import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { MapConfig } from '../const';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  latitude?: number;
  longitude?: number;
  zoom?: number;
};

export default function useMap({
  mapRef,
  latitude = MapConfig.DefaultPosition.Latitude,
  longitude = MapConfig.DefaultPosition.Longitude,
  zoom = MapConfig.DefaultPosition.Zoom,
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

      const layer = new TileLayer(MapConfig.Tile, {
        attribution: MapConfig.Attribution,
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
