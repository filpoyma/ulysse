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
          // Добавляем прямой сегмент
          fullRoute.push(to);
          // Маркер в середине прямой с кастомной SVG-иконкой
          const midPoint: [number, number] = [
            (from[0] + to[0]) / 2,
            (from[1] + to[1]) / 2,
          ];
          const el = document.createElement('div');
          el.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_37_131)">
<path d="M15.9687 0.09375C24.7794 0.09375 31.9218 7.23621 31.9218 16.0469C31.9218 24.8575 24.7794 32 15.9687 32C7.15805 32 0.0155945 24.8575 0.0155945 16.0469C0.0155945 7.23621 7.15805 0.09375 15.9687 0.09375Z" fill="#2C2A29"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.5851 7.09731C21.5888 7.32026 20.3431 8.13762 19.1719 9.33695C18.6726 9.84824 17.9169 10.7971 17.2094 11.8012C17.1364 11.9049 17.0485 11.9895 17.014 11.9894C16.9434 11.9891 13.6965 11.3405 12.3292 11.0536C11.5331 10.8865 11.3808 10.8661 10.9208 10.8651C10.345 10.864 10.0562 10.9227 9.65187 11.1232C8.90678 11.4928 8.36844 12.229 8.14595 13.1827C8.09758 13.39 8.09873 13.415 8.15761 13.4382C8.19352 13.4523 9.63334 13.9467 11.3572 14.5369C13.081 15.1271 14.5052 15.6223 14.5221 15.6374C14.5481 15.6608 12.8392 18.2712 12.7113 18.4034C12.6771 18.4387 12.5535 18.4372 12.1904 18.3969C11.2695 18.2948 10.4097 18.2521 10.1422 18.2952C9.57407 18.3867 9.06846 18.7918 8.76249 19.4005C8.58133 19.761 8.42331 20.2455 8.47624 20.2783C8.49655 20.2908 9.37121 20.542 10.42 20.8366L12.3268 21.3721L13.429 23.2053C14.3805 24.788 14.542 25.0358 14.6105 25.0178C14.6541 25.0063 14.8174 24.9355 14.9733 24.8605C15.8883 24.4202 16.2504 23.5382 15.9819 22.4035C15.8635 21.9034 15.6566 21.2526 15.4472 20.7217L15.2688 20.2697L15.4752 20.0435C15.5888 19.9191 16.1554 19.3102 16.7344 18.6904C19.415 15.8208 21.0863 13.9689 21.9584 12.9021C22.8477 11.8142 23.5352 10.3732 23.7729 9.09915C23.8555 8.65657 23.8533 8.0342 23.7682 7.73071C23.6859 7.43738 23.4563 7.17931 23.2198 7.11437C23.0633 7.07136 22.7397 7.06267 22.5851 7.09731ZM19.5925 17.5403L18.2055 19.2031L19.6148 21.4182C20.3899 22.6366 21.0399 23.6497 21.0593 23.6697C21.1057 23.7175 21.4448 23.4905 21.8345 23.1506C22.4183 22.6415 22.8831 21.9361 23.0195 21.3522C23.1073 20.9766 23.0987 20.4029 22.9999 20.0464C22.9513 19.8709 22.5926 19.0854 22.1035 18.0834C21.6551 17.1647 21.2318 16.2933 21.163 16.1469C21.0941 16.0005 21.0246 15.88 21.0086 15.8791C20.9926 15.8782 20.3553 16.6257 19.5925 17.5403Z" fill="#F5EEE8"/>
</g>
<defs>
<clipPath id="clip0_37_131">
<rect width="31.9062" height="31.9062" fill="white" transform="translate(0.0155945 0.09375)"/>
</clipPath>
</defs>
</svg>
`;
          el.style.transform = 'translate(-50%, -50%)';
          el.style.width = '32px';
          el.style.height = '32px';
          new mapboxgl.Marker({ element: el })
            .setLngLat(midPoint)
            .setPopup(new mapboxgl.Popup().setText('Середина прямой линии'))
            .addTo(map);
        } else {
          // Directions API
          const url = `https://api.mapbox.com/directions/v5/mapbox/${routeType}/${from.join(',')};${to.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`;
          const res = await fetch(url);
          const data = await res.json();
          const segment = data.routes[0]?.geometry?.coordinates || [];
          // Добавляем все точки сегмента, кроме первой (from уже есть)
          fullRoute = fullRoute.concat(segment.slice(1));
          // Маркер в середине сегмента маршрута (обычный)
          if (segment.length > 1) {
            const midIndex = Math.floor(segment.length / 2);
            const midPoint = segment[midIndex] as [number, number];
            new mapboxgl.Marker({ color: '#000', scale: 1.2 })
              .setLngLat(midPoint)
              .setPopup(new mapboxgl.Popup().setText('Середина маршрута'))
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
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />;
};

export default MapWithCustomLayer;