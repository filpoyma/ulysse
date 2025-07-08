import styles from '../SingleHotel/SingleHotel.module.css';
import HotelHeader from '../SingleHotel/HotelHeader.tsx';
import FlowerIcon from '../../../assets/icons/flower.svg';
import { useSelector } from 'react-redux';
import { selectHotelsListName } from '../../../store/selectors.ts';
import { selectHotelsNames } from '../../../store/reSelect.ts';

const MapPage = () => {
  const listName = useSelector(selectHotelsListName);
  const hotelsNames = useSelector(selectHotelsNames);
  return (
    <div className={styles.container}>
      {/* Левая секция - главное изображение */}
      <div className={styles.leftSection}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
          MAP
        </div>
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
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MapPage;
