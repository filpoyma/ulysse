import { ChangeEvent, useEffect, useState } from 'react';
import { IHotel } from '../../../types/hotel.types';
import { hotelsListService, IHotelsListWithHotels } from '../../../services/hotelsList.service';
import styles from '../AdminPanel.module.css';
import { Loader } from '../../../components/Loader/Loader';
import { hotelService } from '../../../services/hotel.service.ts';
import { useSelector } from 'react-redux';
import { selectHotels } from '../../../store/selectors.ts';

const HotelsListEditPage = ({
  onSuccess,
  id,
  returnHandler,
}: {
  onSuccess?: () => void;
  id: string;
  returnHandler: (id: string) => void;
}) => {
  const allHotels = useSelector(selectHotels);
  const [selectedHotels, setSelectedHotels] = useState<IHotel[]>([]);
  const [search, setSearch] = useState('');
  const [listHeaders, setListHeaders] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  // Загрузка списка и всех отелей
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await hotelService.getAll();
        const listRes = await hotelsListService.getById(id);
        setListHeaders({
          name: listRes.data.name || '',
          description: listRes.data.description || '',
        });
        //@ts-ignore
        setSelectedHotels(listRes.data.hotels);
      } catch (e) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Фильтрация по поиску и исключение уже выбранных
  const filteredHotels = allHotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedHotels.some((sel) => sel._id === hotel._id),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListHeaders((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddHotel = (hotel: IHotel) => {
    setIsEdited(true);
    setSelectedHotels((prev) => [...prev, hotel]);
  };

  const handleRemoveHotel = (hotelId: string) => {
    setIsEdited(true);
    setSelectedHotels((prev) => prev.filter((h) => h._id !== hotelId));
  };

  const handleSave = async () => {
    if (!id) return;
    if (!listHeaders.name.trim() || selectedHotels.length === 0) {
      setError('Заполните название и выберите хотя бы один отель');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await hotelsListService.update(id, {
        name: listHeaders.name,
        description: listHeaders.description,
        hotels: selectedHotels.map((h) => h._id),
      });
      if (onSuccess) onSuccess();
      setIsEdited(false);
    } catch (e) {
      setError('Ошибка при сохранении списка');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.editPageWrapper}>
      <div className={styles.formRow}>
        <button
          className={styles.backButton}
          onClick={() => {
            if (isEdited && window.confirm('Сохранить изменеия?')) handleSave();
            else returnHandler('');
          }}>
          Назад
        </button>
      </div>
      <h2>Редактировать список отелей</h2>
      <div className={styles.formRow}>
        <input
          className={styles.hotelCreateInput}
          type="text"
          name="name"
          placeholder="Название списка"
          value={listHeaders.name}
          onChange={handleChange}
        />
        <input
          className={styles.hotelCreateInput}
          type="text"
          name="description"
          placeholder="Описание"
          value={listHeaders.description}
          onChange={handleChange}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.tablesRow}>
          {/* Таблица выбранных отелей */}
          <div className={styles.tableWrapper} style={{ flex: 1 }}>
            <div className={styles.tableHeader}>Выбранные отели</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Страна</th>
                  <th>Адрес</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedHotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>{hotel.name}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.address}</td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleRemoveHotel(hotel._id)}
                        title="Удалить">
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.saveBtnContainer}>
            <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
              {saving ? 'Сохраняю...' : 'Сохранить список'}
            </button>
          </div>
          {/* Таблица всех отелей */}
          <div className={styles.tableWrapper} style={{ flex: 1 }}>
            <div className={styles.tableHeader}>
              <input
                className={styles.hotelCreateInput}
                type="text"
                placeholder="Поиск отеля"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 8, width: '100%' }}
              />
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Страна</th>
                  <th>Адрес</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredHotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>{hotel.name}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.address}</td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleAddHotel(hotel)}
                        title="Добавить">
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsListEditPage;
