import { ChangeEvent, useEffect, useState } from 'react';
import { IRestaurant } from '../../../types/restaurant.types';
import styles from './HotelEditPage.module.css';
import { useSelector } from 'react-redux';
import { restaurantService } from '../../../services/restaurant.service';
import { selectRestaurants } from '../../../store/selectors';
import { IUploadedImage } from '../../../types/uploadImage.types.ts';
import { CountryAutocomplete } from '../../../components/CountryAutocomplete/CountryAutocomplete.tsx';
import { getErrorMessage, getImagePath, validateHotelCoordinates } from '../../../utils/helpers.ts';
import ImageUploadRestaurants from '../../../components/ImageUploadModal/ImageUploadRestaurants.tsx';

const RestaurantEditPage = ({
  restaurantId,
  returnHandler,
}: {
  restaurantId: string;
  returnHandler: (id: string) => void;
}) => {
  const restaurants = useSelector(selectRestaurants);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantCoord, setRestaurantCoord] = useState('');
  const [coordinateError, setCoordinateError] = useState<{
    isValid: boolean;
    error: string | null;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMany, setIsMany] = useState(false);
  const [galleryType, setGalleryType] = useState<'gallery' | null>(null);

  useEffect(() => {
    if (restaurantId) {
      if (restaurants && restaurants.length > 0) {
        setIsLoading(false);
        const restaurant = restaurants.find((r: IRestaurant) => r._id === restaurantId);
        if (restaurant) setRestaurant(restaurant);
        else {
          alert('Ресторан не найден');
        }
      } else {
        restaurantService
          .getById(restaurantId)
          .then((restaurant) => {
            setRestaurant(restaurant.data);
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
      }
    }
  }, [restaurantId, restaurants]);

  useEffect(() => {
    if (restaurant) setRestaurantCoord(`${restaurant.coordinates[1]} ${restaurant.coordinates[0]}`);
    setCoordinateError(null);
  }, [restaurant]);

  const handleInputChange = (
    field: keyof IRestaurant,
    value: string | string[] | number[] | number,
  ) => {
    setRestaurant((restaurant) => {
      if (!restaurant) return null;
      return { ...restaurant, [field]: value };
    });
  };

  const handleInputChangeCoord = (e: ChangeEvent<HTMLInputElement>) => {
    setCoordinateError(null);
    setRestaurantCoord(e.target.value.replace(/[^0-9\s.]/g, ''));
  };

  const handleSelectManyImages = (type: 'gallery') => {
    setIsMany(true);
    setGalleryType(type);
    setIsModalOpen(true);
  };

  const handleSelectOneImage = () => {
    setIsMany(false);
    setGalleryType(null);
    setIsModalOpen(true);
  };

  const handleDeleteImage = async (imageId: string, type: 'gallery') => {
    if (!restaurant || !imageId || !restaurant._id) return;

    try {
      const updatedGallery = restaurant.gallery.filter((img) => img._id !== imageId);

      await restaurantService.updateGallery(
        restaurant._id,
        updatedGallery.map((img) => img._id || ''),
      );

      setRestaurant((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          gallery: updatedGallery,
        };
      });
    } catch (err) {
      console.error('Error deleting image:', err);
      alert(getErrorMessage(err));
    }
  };

  const handleSave = async () => {
    if (!restaurant) return;
    const validation = validateHotelCoordinates(restaurantCoord);
    if (!validation.isValid) {
      setCoordinateError(validation);
      alert('Ошибка координат');
      return;
    }

    const [lng, lat] = restaurantCoord
      .split(' ')
      .map((coord) => parseFloat(coord.trim()))
      .reverse();
    const restaurantWithParsedCoordinates = {
      ...restaurant,
      coordinates: [lng, lat] as [number, number],
    };
    setIsLoading(true);
    try {
      await restaurantService.update(restaurantId, restaurantWithParsedCoordinates);
      console.log('Saving restaurant:', restaurant);
      setCoordinateError(null);
      returnHandler('');
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!restaurant) return <div className={styles.error}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <ImageUploadRestaurants
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        restaurantId={restaurant._id}
        isMany={isMany}
        galleryType={galleryType || undefined}
        belongsToId={restaurant._id}
      />

      {/* Левая панель - галерея */}
      <div className={styles.leftPanel}>
        <div className={styles.gallerySection}>
          <h2>Главная картинка</h2>
          <div className={styles.gallery}>
            {restaurant.titleImage ? (
              <div className={styles.imageItem} onClick={handleSelectOneImage}>
                <img src={getImagePath(restaurant.titleImage?.path)} alt={`Restaurant image`} />
              </div>
            ) : (
              <div className={styles.placeholder} onClick={handleSelectOneImage} />
            )}
          </div>
        </div>

        <div className={styles.gallerySection}>
          <h2>Галерея ресторана</h2>
          <div className={styles.gallery}>
            {restaurant.gallery && restaurant.gallery.length > 0 ? (
              restaurant.gallery.map((image: IUploadedImage, index: number) => (
                <div key={image._id} className={styles.imageItem}>
                  <img src={getImagePath(image.path)} alt={`Restaurant image ${index + 1}`} />
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (image._id) {
                        handleDeleteImage(image._id, 'gallery');
                      }
                    }}>
                    ×
                  </button>
                </div>
              ))
            ) : (
              <div
                className={styles.placeholder}
                onClick={() => handleSelectManyImages('gallery')}></div>
            )}
            {restaurant.gallery && restaurant.gallery.length > 0 && (
              <div
                className={styles.placeholder}
                onClick={() => handleSelectManyImages('gallery')}></div>
            )}
          </div>
        </div>
      </div>

      {/* Правая панель - форма редактирования */}
      <div className={styles.rightPanel}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => returnHandler('')}>
            ← Назад
          </button>
          <h1>Редактирование ресторана</h1>
        </div>

        <div className={styles.form}>
          {/* Основная информация */}
          <div className={styles.section}>
            <h2>Основная информация</h2>
            <div className={styles.field}>
              <label>Название ресторана *</label>
              <input
                type="text"
                value={restaurant.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Страна *</label>
              <CountryAutocomplete
                value={restaurant.country || ''}
                onChange={(value) => handleInputChange('country', value)}
              />
            </div>

            <div className={styles.field}>
              <label>Город</label>
              <input
                type="text"
                value={restaurant.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Регион</label>
              <input
                type="text"
                value={restaurant.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Адрес</label>
              <input
                type="text"
                value={restaurant.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Ссылка</label>
              <input
                type="text"
                value={restaurant.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Менеджер</label>
              <input
                type="text"
                value={restaurant.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Количество звёзд</label>
              <input
                type="number"
                min={1}
                max={5}
                value={restaurant.stars}
                onChange={(e) => handleInputChange('stars', Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label>Координаты через пробел (25.44 81.85)</label>
              <div className={coordinateError ? styles.coordinateFieldErr : styles.coordinateField}>
                <input
                  pattern="^[0-9\s.]+$"
                  placeholder="Широта Долгота"
                  value={restaurantCoord || ''}
                  onChange={handleInputChangeCoord}
                />
                {coordinateError ? (
                  <div className={styles.helperTextErr}>{coordinateError.error}</div>
                ) : (
                  <div className={styles.helperText}>Широта: -90°...90°. Долгота:-180°...180°.</div>
                )}
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className={styles.section}>
            <h2>Описание</h2>
            <div className={styles.field}>
              <label>Описание ресторана</label>
              <textarea
                value={restaurant.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </div>

          <button className={styles.saveButton} onClick={handleSave} disabled={isLoading}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantEditPage;
