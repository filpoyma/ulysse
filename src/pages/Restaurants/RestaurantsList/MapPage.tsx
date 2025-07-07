import styles from '../SingleRestaurant/styles.module.css';
import RestHeader from '../SingleRestaurant/RestHeader.tsx';
import FlowerIcon from '../../../assets/icons/flower.svg';
import { useSelector } from 'react-redux';
import { selectRestListName } from '../../../store/selectors.ts';
import { selectRestaurantsNames } from '../../../store/reSelect.ts';

const MapPage = () => {
  const listName = useSelector(selectRestListName);
  const restNames = useSelector(selectRestaurantsNames);
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
            border: 'solid black 1px',
          }}>
          MAP
        </div>
      </div>

      {/* Правая секция - информация о списках */}
      <div className={styles.rightSection}>
        {/* Имя ресторана */}
        <div className={styles.title}>{listName}</div>

        {restNames && restNames.length > 0 && (
          <>
            <RestHeader title={'КАРТА РЕСТОРАНОВ'} Icon={FlowerIcon} />

            <ul className={styles.infoListCustom}>
              {restNames.map((item) => (
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
