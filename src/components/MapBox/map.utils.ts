import { copyToClipboard } from '../../utils/helpers.ts';
import mapboxgl, { LngLat } from 'mapbox-gl';
import styles from './MapBox.module.css';

export const copyToClipboardWithTooltip = (map: any, lngLat: LngLat) => {
  console.log('Координаты клика:', lngLat.lng, lngLat.lat);
  copyToClipboard(`${lngLat.lng.toFixed(5)} ${lngLat.lat.toFixed(5)}`);
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
