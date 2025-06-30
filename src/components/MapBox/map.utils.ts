import { copyToClipboard } from '../../utils/helpers.ts';
import mapboxgl, { LngLat } from 'mapbox-gl';
import styles from './MapBox.module.css';

export const copyToClipboardWithTooltip = (map: any, lngLat: LngLat) => {
  console.log('Координаты клика:', lngLat.lng, lngLat.lat);
  copyToClipboard(`${lngLat.lat.toFixed(5)} ${lngLat.lng.toFixed(5)}`);
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  })
    .setLngLat([lngLat.lng, lngLat.lat])
    .setHTML(`<div class=${styles.tooltip}>Координаты скопированны</div>`)
    .addTo(map);
  setTimeout(() => {
    popup.remove();
  }, 500);
};

export const createIconEl = (icon: string) => {
  const el = document.createElement('div');
  el.innerHTML = icon;
  el.style.transform = 'translate(-50%, -50%)';
  el.style.width = '32px';
  el.style.height = '32px';
  return el;
};

export const getRouteType = (type: string) => {
  if (type === 'walking') return 'walking';
  return 'driving';
};

export const validateClipboardCoordinates = (str: string) => {
  const regex = /^-?\d+\.\d+\s+-?\d+\.\d+$/;
  // Проверяем соответствие формату
  if (!regex.test(str))
    throw new Error('Неверный формат координат. Используйте формат: "12.234 29.4545"');

  // Разбиваем строку на координаты
  const [lng, lat] = str.split(' ').map(Number).reverse();
  // Проверяем диапазоны координат
  if (lat < -90 || lat > 90) throw new Error('Широта должна быть в диапазоне от -90 до 90');

  if (lng < -180 || lng > 180) throw new Error('Долгота должна быть в диапазоне от -180 до 180');
};
