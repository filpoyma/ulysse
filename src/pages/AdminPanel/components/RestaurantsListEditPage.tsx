import { ChangeEvent, useEffect, useState } from 'react';
import { IRestaurant } from '../../../types/restaurant.types';
import { restaurantsListService } from '../../../services/restaurantsList.service';
import styles from '../AdminPanel.module.css';
import { Loader } from '../../../components/Loader/Loader';
import { restaurantService } from '../../../services/restaurant.service.ts';
import { useSelector } from 'react-redux';
import { selectRestaurants } from '../../../store/selectors.ts';
import { getErrorMessage } from '../../../utils/helpers.ts';
import ChevronUp from '../../../assets/icons/chevronUp.svg';
import ChevronDown from '../../../assets/icons/chevronDown.svg';

const RestaurantsListEditPage = ({
  onSuccess,
  id,
  returnHandler,
}: {
  onSuccess?: () => void;
  id: string;
  returnHandler: (id: string) => void;
}) => {
  const allRestaurants = useSelector(selectRestaurants);
  const [selectedRestaurants, setSelectedRestaurants] = useState<IRestaurant[]>([]);
  const [search, setSearch] = useState('');
  const [listHeaders, setListHeaders] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  // Загрузка списка и всех ресторанов
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await restaurantService.getAll();
        const listRes = await restaurantsListService.getById(id);
        console.log('file-RestaurantsListEditPage.tsx listRes:', listRes);
        setListHeaders({
          name: listRes.data.name || '',
          description: listRes.data.description || '',
        });
        //@ts-ignore
        setSelectedRestaurants(listRes.data.restaurants);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Фильтрация по поиску и исключение уже выбранных
  const filteredRestaurants = allRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedRestaurants.some((sel) => sel._id === restaurant._id),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListHeaders((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddRestaurant = (restaurant: IRestaurant) => {
    setIsEdited(true);
    setSelectedRestaurants((prev) => [...prev, restaurant]);
  };

  const handleRemoveRestaurant = (restaurantId: string) => {
    setIsEdited(true);
    setSelectedRestaurants((prev) => prev.filter((r) => r._id !== restaurantId));
  };

  const moveRestaurantUp = (index: number) => {
    if (index === 0) return; // Нельзя поднять первый элемент
    setIsEdited(true);
    setSelectedRestaurants((prev) => {
      const newRestaurants = [...prev];
      [newRestaurants[index - 1], newRestaurants[index]] = [
        newRestaurants[index],
        newRestaurants[index - 1],
      ];
      return newRestaurants;
    });
  };

  const moveRestaurantDown = (index: number) => {
    if (index === selectedRestaurants.length - 1) return; // Нельзя опустить последний элемент
    setIsEdited(true);
    setSelectedRestaurants((prev) => {
      const newRestaurants = [...prev];
      [newRestaurants[index], newRestaurants[index + 1]] = [
        newRestaurants[index + 1],
        newRestaurants[index],
      ];
      return newRestaurants;
    });
  };

  const handleSave = async () => {
    if (!id) return;
    if (!listHeaders.name.trim() || selectedRestaurants.length === 0) {
      setError('Заполните название и выберите хотя бы один ресторан');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await restaurantsListService.update(id, {
        name: listHeaders.name,
        description: listHeaders.description,
        restaurants: selectedRestaurants
          .map((r) => r._id)
          .filter((id): id is string => id !== undefined),
      });
      setIsEdited(false);
      returnHandler('');
    } catch (err) {
      setError(getErrorMessage(err));
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
            if (isEdited && window.confirm('Сохранить изменения?')) handleSave();
            else returnHandler('');
          }}>
          Назад
        </button>
      </div>
      <h2>Редактировать список ресторанов</h2>
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
          {/* Таблица выбранных ресторанов */}
          <div className={styles.tableWrapper} style={{ flex: 1 }}>
            <div className={styles.tableHeader}>Выбранные рестораны</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Страна</th>
                  <th>Город</th>
                  <th>Порядок</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedRestaurants.map((restaurant, index) => (
                  <tr key={restaurant._id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.country}</td>
                    <td>{restaurant.city}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          onClick={() => moveRestaurantUp(index)}
                          disabled={index === 0}
                          title="Поднять выше">
                          <ChevronUp />
                        </button>
                        <button
                          className={styles.actionButton}
                          onClick={() => moveRestaurantDown(index)}
                          disabled={index === selectedRestaurants.length - 1}
                          title="Опустить ниже">
                          <ChevronDown />
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => restaurant._id && handleRemoveRestaurant(restaurant._id)}
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
          {/* Таблица всех ресторанов */}
          <div className={styles.tableWrapper} style={{ flex: 1 }}>
            <div className={styles.tableHeader}>
              <input
                className={styles.hotelCreateInput}
                type="text"
                placeholder="Поиск ресторана"
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
                  <th>Город</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant._id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.country}</td>
                    <td>{restaurant.city}</td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleAddRestaurant(restaurant)}
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

export default RestaurantsListEditPage;
