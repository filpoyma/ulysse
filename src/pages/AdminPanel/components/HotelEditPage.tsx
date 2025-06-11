import React, { useEffect, useState } from 'react';
import { IHotel } from '../../../types/hotel.types';
import styles from './HotelEditPage.module.css';
import { useSelector } from 'react-redux';
import { hotelService } from '../../../services/hotel.service';
import { selectHotels } from '../../../store/selectors';
import ImageUploadModal from '../../../components/ImageUploadModal/ImageUploadModal.tsx';
import ImageUploadHotels from '../../../components/ImageUploadModal/ImageUploadHotels.tsx';

const HotelEditPage = ({
  hotelId,
  returnHandler,
}: {
  hotelId: string;
  returnHandler: (id: string) => void;
}) => {
  const hotels = useSelector(selectHotels);
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roomsGallery = hotel?.roomInfo?.gallery || [];
  const hotelGallery = hotel?.hotelInfo?.gallery || [];

  useEffect(() => {
    if (hotelId) {
      if (hotels && hotels.length) {
        const hotel = hotels.find(h => h._id === hotelId);
        if (hotel) setHotel(hotel);
        else setError('Отель не найден');
      } else {
        hotelService.getById(hotelId).then(hotel => {
          setHotel(hotel.data);
        });
      }
    }
  }, [hotelId, hotels]);

  const handleInputChange = (
    field: keyof IHotel | 'hotelInfo.about' | 'roomInfo.about',
    value: string | string[],
  ) => {
    setHotel(hotel => {
      if (!hotel) return null;

      if (field === 'hotelInfo.about') {
        return {
          ...hotel,
          hotelInfo: {
            ...hotel.hotelInfo,
            about: value as string,
          },
        };
      }

      if (field === 'roomInfo.about') {
        return {
          ...hotel,
          roomInfo: {
            ...hotel.roomInfo,
            about: value as string,
          },
        };
      }

      return { ...hotel, [field]: value };
    });
  };

  const handleSave = async () => {
    if (!hotel) return;
    try {
      await hotelService.update(hotelId, hotel);
      console.log('Saving hotel:', hotel);
    } catch (error) {
      setError(`Ошибка при сохранении отеля ${error?.message}`);
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!hotel) {
    return <div className={styles.error}>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <ImageUploadHotels
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hotelId={hotel._id}
      />

      {/* Левая панель - галереи */}
      <div className={styles.leftPanel}>
        <div className={styles.gallerySection}>
          <h2>Главная картинка</h2>
          <div className={styles.gallery}>
            {hotel.mainImage ? (
              <div className={styles.imageItem}>
                <img src={hotel.mainImage} alt={`Hotel image`} />
              </div>
            ) : (
              <div className={styles.placeholder} onClick={() => setIsModalOpen(true)}>
                Выбрать изображение
              </div>
            )}
          </div>
        </div>

        <div className={styles.gallerySection}>
          <h2>Галерея отеля</h2>
          <div className={styles.gallery}>
            {hotelGallery.length > 0 ? (
              hotelGallery.map((image: string, index: number) => (
                <div key={index} className={styles.imageItem}>
                  <img src={image} alt={`Hotel image ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className={styles.placeholder}>Выбрать изображение</div>
            )}
          </div>
        </div>

        <div className={styles.gallerySection}>
          <h2>Галерея номеров</h2>
          <div className={styles.gallery}>
            {roomsGallery.length > 0 ? (
              roomsGallery.map((image: string, index: number) => (
                <div key={index} className={styles.imageItem}>
                  <img src={image} alt={`Room image ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className={styles.placeholder}>Выбрать изображение</div>
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
          <h1>Редактирование отеля</h1>
        </div>

        <div className={styles.form}>
          {/* Основная информация */}
          <div className={styles.section}>
            <h2>Основная информация</h2>
            <div className={styles.field}>
              <label>Название отеля</label>
              <input
                type="text"
                value={hotel.name}
                onChange={e => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Страна</label>
              <input
                type="text"
                value={hotel.country}
                onChange={e => handleInputChange('country', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Регион</label>
              <input
                type="text"
                value={hotel.region}
                onChange={e => handleInputChange('region', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Ссылка</label>
              <input
                type="text"
                value={hotel.link}
                onChange={e => handleInputChange('link', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Адрес</label>
              <input
                type="text"
                value={hotel.address}
                onChange={e => handleInputChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Информация об отеле */}
          <div className={styles.section}>
            <h2>Информация об отеле</h2>
            <div className={styles.field}>
              <label>Описание</label>
              <textarea
                value={hotel.hotelInfo.about}
                onChange={e => handleInputChange('hotelInfo.about', e.target.value)}
              />
            </div>
          </div>

          {/* Информация о номерах */}
          <div className={styles.section}>
            <h2>Информация о номерах</h2>
            <div className={styles.field}>
              <label>Описание номеров</label>
              <textarea
                value={hotel.roomInfo?.about}
                onChange={e => handleInputChange('roomInfo.about', e.target.value)}
              />
            </div>
          </div>

          {/* Преимущества */}
          <div className={styles.section}>
            <h2>Преимущества</h2>
            <div className={styles.field}>
              <label>Разделяйте запятыми. Нажмите Enter.</label>
              <input
                type="text"
                placeholder="WiFi Парковка Бассейн"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const newItems = input.value.split(',').filter(item => item.trim());
                    if (newItems.length > 0) {
                      const updatedPros = [...(hotel.pros || []), ...newItems];
                      handleInputChange('pros', updatedPros);
                      input.value = '';
                    }
                  }
                }}
              />
            </div>
            <div className={styles.list}>
              {hotel.pros?.map((advantage, index) => (
                <div key={index} className={styles.listItem}>
                  <span>{advantage}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => {
                      const newPros = hotel.pros?.filter((_, i) => i !== index) || [];
                      handleInputChange('pros', newPros);
                    }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Краткая информация */}
          <div className={styles.section}>
            <h2>Краткая информация</h2>
            <div className={styles.field}>
              <label>Разделяйте запятыми. Нажмите Enter.</label>
              <input
                type="text"
                placeholder="WiFi Парковка Бассейн"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const newItems = input.value.split(',').filter(item => item.trim());
                    if (newItems.length > 0) {
                      const updatedShortInfo = [...(hotel.shortInfo || []), ...newItems];
                      handleInputChange('shortInfo', updatedShortInfo);
                      input.value = '';
                    }
                  }
                }}
              />
            </div>
            <div className={styles.list}>
              {hotel.shortInfo?.map((info, index) => (
                <div key={index} className={styles.listItem}>
                  <span>{info}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => {
                      const newShortInfo = hotel.shortInfo?.filter((_, i) => i !== index) || [];
                      handleInputChange('shortInfo', newShortInfo);
                    }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelEditPage;
