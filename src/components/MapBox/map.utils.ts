import { copyToClipboard } from '../../utils/helpers.ts';
import mapboxgl, { LngLat } from 'mapbox-gl';
import styles from './MapBox.module.css';

export const copyToClipboardWithTooltip = (map: any, lngLat: LngLat) => {
  console.log('Координаты клика:', lngLat.lng, lngLat.lat);
  copyToClipboard(`${lngLat.lng},${lngLat.lat}`);
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
