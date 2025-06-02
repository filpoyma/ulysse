import { useEffect, useRef, memo, FC } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection, LineString } from 'geojson';
import iconsMap from '../../assets/icons/mapIcons/map/icons.map.ts';
import { copyToClipboardWithTooltip } from './map.utils.ts';
import { useSelector } from 'react-redux';
import { selectMapData } from '../../store/selectors.ts';

const createIconEl = (icon: string) => {
  const el = document.createElement('div');
  el.innerHTML = icon;
  el.style.transform = 'translate(-50%, -50%)';
  el.style.width = '32px';
  el.style.height = '32px';
  return el;
};

const getRouteType = (type: string) => {
  if (type === 'walking') return 'walking';
  return 'driving';
};

// const trackData: {
//   logistics: {
//     city: string;
//     coordinates: [number, number];
//     routeType: 'driving' | 'helicopter' | 'flight' | 'yacht' | 'train';
//     markerColor?: string;
//     sourceMapIcon?: 'startPoint';
//     // hotel: string;
//     // time: string;
//     // distance: string;
//   }[];
//   mapCenter: [number, number];
//   zoom: number;
// } = {
//   logistics: [
//     {
//       city: 'Tokyo',
//       coordinates: [139.7671, 35.6812],
//       routeType: 'flight',
//       markerColor: '#d7263d',
//       sourceMapIcon: 'startPoint',
//     },
//     {
//       city: 'Osaka',
//       coordinates: [135.5023, 34.6937],
//       routeType: 'driving',
//       markerColor: '#1b998b',
//       sourceMapIcon: 'startPoint',
//     },
//     {
//       city: 'Kyoto',
//       coordinates: [135.7681, 35.0116],
//       routeType: 'flight',
//       markerColor: '#f2bb05',
//       sourceMapIcon: 'startPoint',
//     },
//     {
//       city: 'Tokyo',
//       coordinates: [139.7671, 35.6812],
//     },
//   ],
//   mapCenter: [139.7671, 35.6812],
//   zoom: 6,
// };

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapWithCustomLayer: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const mapRef = useRef(null);
  const trackData = useSelector(selectMapData);
  const setScreenPosition = (mapCenter: LngLat, zoom: number) => {
    console.log('file-MapBoxCustomLayer.component.tsx mapCenter, zoom:', mapCenter, zoom);
  };

  useEffect(() => {
    if (!trackData) return;
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: trackData.mapCenter,
      zoom: trackData.zoom,
    });
    if (isLoggedIn) {
      map.getCanvas().style.cursor = 'default';

      map.on('click', e => {
        const lngLat = e.lngLat; // объект {lng, lat}
        copyToClipboardWithTooltip(map, lngLat);
      });

      map.on('moveend', () => {
        setScreenPosition(map.getCenter(), map.getZoom());
      });

    }

    // Добавляем маркеры
    trackData.logistics.forEach(point => {
      if (point.sourceMapIcon) {
        const el = createIconEl(iconsMap[point.sourceMapIcon]);
        new mapboxgl.Marker({ element: el })
          .setLngLat(point.coordinates)
          .setPopup(new mapboxgl.Popup().setText(point.city))
          .addTo(map);
      } else if (point.markerColor) {
        new mapboxgl.Marker({ color: point.markerColor || '#000' })
          .setLngLat(point.coordinates)
          .setPopup(new mapboxgl.Popup().setText(point.city))
          .addTo(map);
      }
    });

    map.on('load', async () => {
      const accessToken = mapboxgl.accessToken;
      let fullRoute: number[][] = [trackData.logistics[0].coordinates];

      for (let i = 0; i < trackData.logistics.length - 1; i++) {
        const from = trackData.logistics[i].coordinates;
        const to = trackData.logistics[i + 1].coordinates;
        const routeType = trackData.logistics[i]?.routeType;
        if (routeType === 'flight' || routeType === 'yacht' || routeType === 'helicopter') {
          // Добавляем прямой сегмент
          fullRoute.push(to);
          // Маркер в середине прямой с кастомной SVG-иконкой
          const midPoint: [number, number] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
          const el = createIconEl(iconsMap[routeType]);
          new mapboxgl.Marker({ element: el })
            .setLngLat(midPoint)
            .setPopup(new mapboxgl.Popup().setText('Середина'))
            .addTo(map);
        } else {
          // Directions API
          const url = `https://api.mapbox.com/directions/v5/mapbox/${getRouteType(
            routeType,
          )}/${from.join(',')};${to.join(
            ',',
          )}?geometries=geojson&overview=full&access_token=${accessToken}`;
          const res = await fetch(url);
          const data = await res.json();
          const segment = data.routes[0]?.geometry?.coordinates || [];
          // Добавляем все точки сегмента, кроме первой (from уже есть)
          fullRoute = fullRoute.concat(segment.slice(1));
          // Маркер в середине сегмента маршрута
          if (segment.length > 1) {
            const midIndex = Math.floor(segment.length / 2);
            const midPoint = segment[midIndex] as [number, number];
            // new mapboxgl.Marker({ color: '#000', scale: 1.2 })
            //   .setLngLat(midPoint)
            //   .setPopup(new mapboxgl.Popup().setText('Середина маршрута'))
            //   .addTo(map);
            const el = createIconEl(iconsMap[routeType]);
            new mapboxgl.Marker({ element: el })
              .setLngLat(midPoint)
              .setPopup(new mapboxgl.Popup().setText('Середина'))
              .addTo(map);
          }
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
  }, [isLoggedIn, trackData]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(MapWithCustomLayer);
