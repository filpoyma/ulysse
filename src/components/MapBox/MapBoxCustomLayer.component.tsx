// MapWithCustomLayer.jsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection, Polygon, LineString } from 'geojson';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const TOKYO: [number, number] = [139.7671, 35.6812];
const OSAKA: [number, number] = [135.5023, 34.6937];
const KYOTO: [number, number] = [135.7681, 35.0116];

const MapWithCustomLayer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      //style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: TOKYO as [number, number],
      zoom: 6,
    });

    // Добавляем маркеры
    new mapboxgl.Marker({ color: '#d7263d' })
      .setLngLat(TOKYO)
      .setPopup(new mapboxgl.Popup().setText('Tokyo'))
      .addTo(map);
    new mapboxgl.Marker({ color: '#1b998b' })
      .setLngLat(OSAKA)
      .setPopup(new mapboxgl.Popup().setText('Osaka'))
      .addTo(map);
    new mapboxgl.Marker({ color: '#f2bb05' })
      .setLngLat(KYOTO)
      .setPopup(new mapboxgl.Popup().setText('Kyoto'))
      .addTo(map);

    map.on('load', async () => {
      // Пример GeoJSON полигона (оставим для примера)
      const geojsonData: FeatureCollection<Polygon> = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [137.0, 34.5],
                  [137.5, 34.5],
                  [137.5, 35.0],
                  [137.0, 35.0],
                  [137.0, 34.5],
                ],
              ],
            },
            properties: {
              name: 'Тестовый район',
            },
          },
        ],
      };

      map.addSource('custom-area', {
        type: 'geojson',
        data: geojsonData,
      });

      // Получаем маршрут по дорогам через Directions API
      const accessToken = mapboxgl.accessToken;
      const url1 = `https://api.mapbox.com/directions/v5/mapbox/driving/${TOKYO.join(',')};${OSAKA.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`;
      const url2 = `https://api.mapbox.com/directions/v5/mapbox/driving/${OSAKA.join(',')};${KYOTO.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`;
      try {
        const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
        const data1 = await res1.json();
        const data2 = await res2.json();

        const coords1 = data1.routes[0]?.geometry?.coordinates || [];
        const coords2 = data2.routes[0]?.geometry?.coordinates || [];
        const fullRoute = coords1.concat(coords2.slice(1));

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

        map.addSource('walking-route', {
          type: 'geojson',
          data: routeData,
        });

        map.addLayer({
          id: 'walking-route-line',
          type: 'line',
          source: 'walking-route',
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
      } catch (error) {
        console.error('Directions API error:', error);
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />;
};

export default MapWithCustomLayer;
