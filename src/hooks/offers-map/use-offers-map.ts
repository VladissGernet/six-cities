import { useEffect, useState, MutableRefObject } from 'react';
import { layerGroup, Map, TileLayer, type LayerGroup } from 'leaflet';

const OffersMapConfig = {
  Tile: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  DefaultPosition: {
    Latitude: 0,
    Longitude: 0,
    Zoom: 10,
  },
} as const;

type UseOffersMapProps = {
  mapContainerRef: MutableRefObject<HTMLElement | null>;
  latitude?: number;
  longitude?: number;
  zoom?: number;
};

export type UseOffersMapResult = {
  map: Map | null;
  mapLayerGroup: LayerGroup | null;
};

const useOffersMap = ({
  mapContainerRef,
  latitude = OffersMapConfig.DefaultPosition.Latitude,
  longitude = OffersMapConfig.DefaultPosition.Longitude,
  zoom = OffersMapConfig.DefaultPosition.Zoom,
}: UseOffersMapProps): UseOffersMapResult => {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const [mapLayerGroup, setMapLayerGroup] = useState<LayerGroup | null>(null);

  // Добавление карты.
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) {
      return;
    }

    const instance = new Map(mapContainer, {
      center: {
        lat: latitude,
        lng: longitude,
      },
      zoom,
    });

    // Добавление тайлов карты.
    const tileLayer = new TileLayer(OffersMapConfig.Tile, {
      attribution: OffersMapConfig.Attribution,
    });
    instance.addLayer(tileLayer);
    setMapInstance(instance);

    // Создание слоя для маркеров предложений.
    const markerLayer = layerGroup().addTo(instance);
    setMapLayerGroup(markerLayer);

    return () => {
      markerLayer.clearLayers();
      markerLayer.remove();
      instance.remove();
    };
  }, [mapContainerRef, latitude, longitude, zoom]);

  return { map: mapInstance, mapLayerGroup };
};

export { useOffersMap };
