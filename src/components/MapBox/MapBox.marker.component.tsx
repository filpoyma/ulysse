import { useEffect, useRef, memo } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import iconsMap from '../../assets/icons/mapIcons/map/icons.map.ts';
import { createIconEl } from './map.utils.ts';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/selectors.ts';

import { selectHotelsForMap } from '../../store/reSelect.ts';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Тип для точек на карте
interface MapPoint {
  coordinates: [number, number];
  name: string;
  id: string;
}

// Функция для центрирования карты по маркерам
const centerMapOnMarkers = (map: mapboxgl.Map, points: MapPoint[]) => {
  if (points.length === 0) return;

  if (points.length === 1) {
    // Если только одна точка, центрируем на ней
    map.setCenter(points[0].coordinates);
    map.setZoom(10);
  } else {
    // Если несколько точек, находим границы и центрируем по ним
    const bounds = new mapboxgl.LngLatBounds();
    
    points.forEach(point => {
      bounds.extend(point.coordinates);
    });
    
    map.fitBounds(bounds, {
      padding: 50, // отступы от краев
      maxZoom: 12, // максимальный зум
      duration: 1000 // анимация центрирования
    });
  }
};

const MapBoxWithMarkers = ({ currentHotelId }: { currentHotelId: string | null }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const mapRef = useRef(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const points = useSelector(selectHotelsForMap);
  const setScreenPosition = (mapCenter: LngLat, zoom: number) => {
    console.log('file-MapBoxCustomLayer.component.tsx mapCenter, zoom:', mapCenter, zoom);
  };

  useEffect(() => {
    if (!points.length) return;
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      // center: [138.46675563464663, 36.35583007420196],
      // zoom: 6,
    });
    mapInstance.current = map;
    
    if (isLoggedIn) {
      map.getCanvas().style.cursor = 'default';

      // map.on('click', (e) => {
      //   const lngLat = e.lngLat; // объект {lng, lat}
      //   copyToClipboardWithTooltip(map, lngLat);
      // });

      map.on('moveend', () => {
        setScreenPosition(map.getCenter(), map.getZoom());
      });
    }

    // Добавляем маркеры
    points.forEach((point) => {
      const el = createIconEl(iconsMap['hotel']);
      new mapboxgl.Marker({ element: el })
        .setLngLat(point.coordinates)
        .setPopup(new mapboxgl.Popup().setText('Отель: ' + point.name))
        .addTo(map);
    });

    // Центрируем карту по маркерам после загрузки
    map.on('load', () => {
      centerMapOnMarkers(map, points);
    });

    return () => map.remove();
  }, [points]);

  useEffect(() => {
    if (!currentHotelId || !mapInstance.current) return;
    const hotel = points.find((p) => p.id === currentHotelId);
    if (hotel) {
      mapInstance.current.flyTo({
        center: hotel.coordinates,
        zoom: 8, 
        speed: 3,
      });
    }
  }, [currentHotelId, points]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(MapBoxWithMarkers);
