import styles from '../SingleHotel/SingleHotel.module.css';
import HotelHeader from '../SingleHotel/HotelHeader.tsx';
import FlowerIcon from '../../../assets/icons/flower.svg';
import { useSelector } from 'react-redux';
import { selectHotelsListName } from '../../../store/selectors.ts';
import { selectHotelsNames } from '../../../store/reSelect.ts';
import { Loader } from '../../../components/Loader/Loader.tsx';
import { Suspense, useState } from 'react';
import MapBoxWithMarkers from '../../../components/MapBox/MapBox.marker.component.tsx';

const MapPage = () => {
  const listName = useSelector(selectHotelsListName);
  const hotelsNames = useSelector(selectHotelsNames);
  const [currentHotelId, setCurrentHotelId] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {/* Левая секция - главное изображение */}
      <div className={styles.leftSection}>
        <Suspense fallback={<Loader />}>
          <MapBoxWithMarkers currentHotelId={currentHotelId} />
        </Suspense>
      </div>

      {/* Правая секция - информация о списках */}
      <div className={styles.rightSection}>
        {/* Имя ресторана */}
        <div className={styles.title}>{listName}</div>

        {hotelsNames && hotelsNames.length > 0 && (
          <>
            <HotelHeader title={'КАРТА ОТЕЛЕЙ'} Icon={FlowerIcon} />

            <ul className={styles.infoListCustom}>
              {hotelsNames.map((item) => (
                <li key={item.id} onClick={() => setCurrentHotelId(item.id)}>{item.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MapPage;
