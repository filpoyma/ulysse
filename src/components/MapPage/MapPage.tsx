import React from 'react';
import styles from './MapPage.module.css';
import IconFlighrArrivalMarker from '../../assets/icons/mapIcons/flightArrivalMarker.svg';
import IconElipses from '../../assets/icons/mapIcons/elipses.svg';
import IconFlight from '../../assets/icons/mapIcons/flight.svg';
import IconHotelMarker from '../../assets/icons/mapIcons/hotelMarker.svg';
import IconTrain from '../../assets/icons/mapIcons/train.svg';

const logistics = [
  {
    id: '1',
    city: 'Tokyo',
    coordinates: [139.7671, 35.6812],
    hotel: 'Aman Tokyo',
    sourceIcon: 'flightArrivalMarker',
    routeType: 'flight',
    time: '1ч 20мин',
    distance: '186км',
  },
  {
    id: '2',
    city: 'Kyoto',
    coordinates: [139.7671, 35.6812],
    hotel: 'Aman Kyoto',
    sourceIcon: 'hotelMarker',
    routeType: 'train',
    time: '1ч 20мин',
    distance: '186км',
  },
  {
    id: '3',
    city: 'Nara',
    coordinates: [139.7671, 35.6812],
    hotel: 'Nono Nara',
    sourceIcon: 'flightArrivalMarker',
    routeType: 'train',
    time: '1ч 20мин',
    distance: '186км',
  },
];

const iconMap: Record<string, React.ReactNode> = {
  flightArrivalMarker: <IconFlighrArrivalMarker height={44} width={37} />,
  flight: <IconFlight height={37} width={37} />,
  hotelMarker: <IconHotelMarker height={44} width={37} />,
  train: <IconTrain height={37} width={37} />,
};

const MapPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>КАРТА / ЛОГИСТИКА ПУТЕШЕСТВИЯ</div>
      <div className={styles.timeline}>
        {logistics.map((item, idx) => (
          <div key={item.id}>
            <div className={styles.timelineItem}>
              <div className={styles.iconCol}>
                <div className={styles.iconCircle}>{iconMap[item.sourceIcon]}</div>
                {idx < logistics.length - 1 && (
                  <div className={styles.dottedLine}>
                    <IconElipses />
                  </div>
                )}
              </div>
              <div className={styles.infoCol}>
                <div className={styles.city}>{item.city}</div>
                <div className={styles.hotel}>{item.hotel}</div>
              </div>
            </div>
            {idx < logistics.length - 1 && (
              <div className={styles.timelineItem}>
                <div className={styles.iconCol}>
                  <div className={styles.iconCircle}>{iconMap[item.routeType || 'train']}</div>
                  <div className={styles.dottedLine}>
                    <IconElipses />
                  </div>
                </div>
                <div className={styles.infoCol}>
                  <div className={styles.transportInfo}>
                    <span className={styles.transportTime}>{item.time}</span>
                    {' / '}
                    <span className={styles.transportDistance}>{item.distance}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
