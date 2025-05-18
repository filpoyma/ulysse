import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection, LineString } from 'geojson';

const trackData: {
  cities: {
    name: string;
    coordinates: [number, number];
    routeType: 'driving' | 'walking' | 'directLine';
    markerColor: string;
  }[];
  mapCenter: [number, number];
} = {
  cities: [
    {
      name: 'Tokyo',
      coordinates: [139.7671, 35.6812],
      routeType: 'directLine',
      markerColor: '#d7263d',
    },
    {
      name: 'Osaka',
      coordinates: [135.5023, 34.6937],
      routeType: 'driving',
      markerColor: '#1b998b',
    },
    {
      name: 'Kyoto',
      coordinates: [135.7681, 35.0116],
      routeType: 'driving',
      markerColor: '#f2bb05',
    },
  ],
  mapCenter: [139.7671, 35.6812],
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapWithCustomLayer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: trackData.mapCenter,
      zoom: 6,
    });

    map.on('click', (e) => {
      const lngLat = e.lngLat; // объект {lng, lat}
      console.log('Координаты клика:', lngLat.lng, lngLat.lat);
    });

    // Добавляем маркеры
    trackData.cities.forEach(city => {
      new mapboxgl.Marker({ color: city.markerColor })
        .setLngLat(city.coordinates)
        .setPopup(new mapboxgl.Popup().setText(city.name))
        .addTo(map);
    });

    map.on('load', async () => {
      const accessToken = mapboxgl.accessToken;


      let fullRoute: number[][] = [trackData.cities[0].coordinates];

for (let i = 0; i < trackData.cities.length - 1; i++) {
  const from = trackData.cities[i].coordinates;
  const to = trackData.cities[i + 1].coordinates;
  const routeType = trackData.cities[i].routeType;

  if (routeType === 'directLine') {
    fullRoute.push(to);
  } else {
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeType}/${from.join(',')};${to.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();
    const segment = data.routes[0]?.geometry?.coordinates || [];
    // Добавляем все точки сегмента, кроме первой (from уже есть)
    fullRoute = fullRoute.concat(segment.slice(1));
  }
}

      const routeData: FeatureCollection<LineString> = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: fullRoute,
            },
            properties: {},
          },
        ],
      };

      map.addSource('route', {
        type: 'geojson',
        data: routeData,
      });

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#0074D9',
          'line-width': 4,
          'line-dasharray': [2, 2],
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />;
};

export default MapWithCustomLayer;