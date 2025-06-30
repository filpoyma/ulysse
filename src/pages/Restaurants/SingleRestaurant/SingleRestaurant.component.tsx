import { IRestaurant } from '../../../types/restaurant.types.ts';
import styles from '../../Hotels/SingleHotel/SingleHotel.module.css';
import { getImagePath } from '../../../utils/helpers.ts';
import ForkAndSpoon from '../../../assets/icons/forkAndSpoon.svg';

const SingleRestaurantComponent = ({ restaurant }: { restaurant: IRestaurant }) => {
  return (
    <div className={styles.container}>
      {/* Левая секция - главное изображение */}
      <div className={styles.leftSection}>
        <img
          src={getImagePath(restaurant.titleImage?.path)}
          alt={restaurant.name}
          className={styles.mainImage}
        />
      </div>

      {/* Правая секция - информация о ресторане */}
      <div className={styles.rightSection}>
        {/* Имя ресторана */}
        <h1 className={styles.title}>{restaurant.name}</h1>
        <div className={styles.divider}></div>

        {/* Описание */}
        <div className={styles.about}>{restaurant.description || 'Описание отсутствует'}</div>
        <div className={styles.divider}></div>

        {/* 2 картинки из gallery */}
        {restaurant.gallery && restaurant.gallery.length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, width: '100%', }}>
            {restaurant.gallery.slice(0, 2).map((img, idx) => (
              <img
                key={img._id || idx}
                src={getImagePath(img.path)}
                alt={`Restaurant gallery ${idx + 1}`}
                style={{ flex: 1, height: 220, objectFit: 'cover', borderRadius: 8, minWidth: 0 }}
              />
            ))}
          </div>
        )}

        {/* Важная информация */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginTop: 24 }}>
          <ForkAndSpoon height={40} width={40}/>
          <div>
            <div style={{ fontWeight: 600, fontSize: 24, marginBottom: 4 }}>Важная информация</div>
            <div style={{ fontSize: 22 }}>Адрес: {restaurant.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRestaurantComponent;
