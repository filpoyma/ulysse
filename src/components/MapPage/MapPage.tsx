import React, { useEffect, useState } from 'react';
import styles from './MapPage.module.css';
import IconElipses from '../../assets/icons/mapIcons/list/elipses.svg';
import { useSelector } from 'react-redux';
import { selectLogisticsData, selectTravelProgram } from '../../store/selectors.ts';
import iconsMapList from '../../assets/icons/mapIcons/list';
import { X, Check, Edit, Plus, Trash2, MoveDown, MoveUp } from 'lucide-react';
import { mapService } from '../../services/map.service';
import { RouteType } from '../../types/map.types';
import { ILogistics } from '../../types/travelProgram.types';

const routeTypeLabels: Record<RouteType, string> = {
  driving: 'Автомобиль',
  helicopter: 'Вертолет',
  flight: 'Самолет',
  yacht: 'Яхта',
  train: 'Поезд',
};

const locationTypeLabels: Record<string, string> = {
  flightArrivalMarker: 'Прилет',
  flightDepartureMarker: 'Вылет',
  hotelMarker: 'Отель',
  parkMarker: 'Нац. парк',
  photoSpotMarker: 'Фото-спот',
  sightMarker: 'Достопримечательность',
  restMarker: 'Ресторан',
};

// Валидация координат
const validateCoordinates = (
  coordinates: string[],
): { isValid: boolean; error: string | null; fieldNumber: number } => {
  let fieldNumber = 0;
  for (const item of coordinates) {
    const [lng, lat] = item.split(',').map(coord => parseFloat(coord.trim()));
    console.log(lat, lng);
    // Проверяем, что значения являются числами
    if (isNaN(lat) || isNaN(lng)) {
      return {
        isValid: false,
        error: 'Координаты должны быть числами',
        fieldNumber,
      };
    }

    // Проверяем диапазоны координат
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return {
        isValid: false,
        error: 'Некорректные координаты: широта от -90 до 90, долгота от -180 до 180',
        fieldNumber,
      };
    }
    fieldNumber++;
  }

  return { isValid: true, error: null, fieldNumber };
};

const MapPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const logistics = useSelector(selectLogisticsData);
  const program = useSelector(selectTravelProgram);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLogistics, setEditedLogistics] = useState(logistics);
  const [isSaving, setIsSaving] = useState(false);
  const [coordinateError, setCoordinateError] = useState<{
    isValid: boolean;
    error: string | null;
    fieldNumber: number;
  } | null>(null);
  const [coordinates, setCoordinates] = useState(['', '']);

  useEffect(() => {
    setCoordinates(logistics.map(item => `${item.coordinates[0]}, ${item.coordinates[1]}`));
  }, [logistics]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedLogistics(logistics);
    setCoordinateError(null);
  };

  const handleSave = async () => {
    if (!program?._id) return;

    // Валидация координат перед сохранением
    const validation = validateCoordinates(coordinates);
    console.log(validation);
    if (!validation.isValid) {
      setCoordinateError(validation);
      return;
    }
    console.log('coordinates', coordinates);
    // Преобразуем текстовые координаты в числа перед валидацией
    const logisticsWithParsedCoordinates = editedLogistics.map((item, i) => ({
      ...item,
      coordinates: coordinates[i].split(',').map(coord => parseFloat(coord.trim())) as [
        number,
        number,
      ],
    }));
    console.log('logisticsWithParsedCoordinates', logisticsWithParsedCoordinates);

    try {
      setIsSaving(true);
      await mapService.updateLogistics(program._id, logisticsWithParsedCoordinates);
      setIsEditing(false);
      setCoordinateError(null);
    } catch (error) {
      console.error('Failed to save logistics:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedLogistics(logistics);
    setCoordinateError(null);
  };

  const handleDelete = (index: number) => {
    setEditedLogistics(prev => prev.filter((_, i) => i !== index));
    setCoordinates(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Can't move first item up

    setEditedLogistics(prev => {
      const newLogistics = [...prev];
      [newLogistics[index - 1], newLogistics[index]] = [
        newLogistics[index],
        newLogistics[index - 1],
      ];
      return newLogistics;
    });

    setCoordinates(prev => {
      const newCoordinates = [...prev];
      [newCoordinates[index - 1], newCoordinates[index]] = [
        newCoordinates[index],
        newCoordinates[index - 1],
      ];
      return newCoordinates;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === editedLogistics.length - 1) return; // Can't move last item down

    setEditedLogistics(prev => {
      const newLogistics = [...prev];
      [newLogistics[index], newLogistics[index + 1]] = [
        newLogistics[index + 1],
        newLogistics[index],
      ];
      return newLogistics;
    });

    setCoordinates(prev => {
      const newCoordinates = [...prev];
      [newCoordinates[index], newCoordinates[index + 1]] = [
        newCoordinates[index + 1],
        newCoordinates[index],
      ];
      return newCoordinates;
    });
  };

  const handleAddNewPoint = () => {
    const newLogisticsItem: Omit<ILogistics, '_id'> = {
      city: 'City Name',
      coordinates: [0, 0] as [number, number],
      hotel: 'Hotel Name',
      routeType: 'train' as RouteType,
      sourceListIcon: 'hotelMarker' as const,
      sourceMapIcon: 'startPoint' as const,
      time: '0ч 00мин',
      distance: '0км',
    };

    setEditedLogistics(prev => [...prev, newLogisticsItem as ILogistics]);
    setCoordinates(prev => [...prev, '0, 0']);
  };

  const handleInputChange = (id: string, field: string, value: string | number[] | RouteType) => {
    setEditedLogistics(prev =>
      prev.map(item => (item._id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleCoordinatesChange = (id: number, value: string) => {
    setCoordinates(prev => prev.map((coord, i) => (i === id ? value : coord)));
    setCoordinateError(prev => (coordinateError?.fieldNumber === id ? null : prev));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>КАРТА / ЛОГИСТИКА ПУТЕШЕСТВИЯ</div>

      {isLoggedIn && (
        <div className={styles.headerContainer}>
          <button className={styles.editIcon} onClick={handleEdit}>
            <Edit size={16} />
          </button>
        </div>
      )}

      {isEditing ? (
        <>
          <div className={styles.editTable}>
            <table>
              <thead>
                <tr>
                  <th>Действия</th>
                  <th>Город</th>
                  <th>Координаты</th>
                  <th>Отель</th>
                  <th>Тип маршрута</th>
                  <th>Локация</th>
                  <th>Время в пути</th>
                  <th>Расстояние</th>
                </tr>
              </thead>
              <tbody>
                {editedLogistics.map((item, i) => (
                  <tr key={item._id}>
                    <td>
                      <div className={styles.moveButtons}>
                        <button
                          className={styles.editIcon}
                          onClick={() => handleMoveUp(i)}
                          disabled={i === 0}>
                          <MoveUp size={16} />
                        </button>
                        <button
                          className={`${styles.editIcon} ${styles.delIcon}`}
                          onClick={() => handleDelete(i)}
                          disabled={isSaving}>
                          <Trash2 size={16} />
                        </button>
                        <button
                          className={styles.editIcon}
                          onClick={() => handleMoveDown(i)}
                          disabled={i === editedLogistics.length - 1}>
                          <MoveDown size={16} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.city}
                        onChange={e => handleInputChange(item._id, 'city', e.target.value)}
                      />
                    </td>
                    <td>
                      <div className={styles.coordinatesInput}>
                        <input
                          type="text"
                          value={coordinates[i]}
                          onChange={e => handleCoordinatesChange(i, e.target.value)}
                          placeholder="широта, долгота"
                          className={coordinateError?.fieldNumber === i ? styles.error : ''}
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.hotel}
                        onChange={e => handleInputChange(item._id, 'hotel', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={item.routeType || 'train'}
                        onChange={e =>
                          handleInputChange(item._id, 'routeType', e.target.value as RouteType)
                        }
                        className={styles.select}>
                        {Object.entries(routeTypeLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={item.sourceListIcon || 'hotelMarker'}
                        onChange={e =>
                          handleInputChange(item._id, 'sourceListIcon', e.target.value)
                        }
                        className={styles.select}>
                        {Object.entries(locationTypeLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.time}
                        onChange={e => handleInputChange(item._id, 'time', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.distance}
                        onChange={e => handleInputChange(item._id, 'distance', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.editControls}>
            <button className={styles.editIcon} onClick={handleAddNewPoint} disabled={isSaving}>
              <Plus size={16} />
            </button>
            <button className={styles.editIcon} onClick={handleCancel} disabled={isSaving}>
              <X size={16} />
            </button>
            <button className={styles.editIcon} onClick={handleSave} disabled={isSaving}>
              {isSaving ? <div className={styles.spinner} /> : <Check size={16} />}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.timeline}>
          {logistics.map((item, idx) => (
            <div key={item._id}>
              <div className={styles.timelineItem}>
                <div className={styles.iconCol}>
                  <div className={styles.iconCircle}>{iconsMapList[item.sourceListIcon]}</div>
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
                    <div className={styles.iconCircle}>
                      {iconsMapList[item.routeType || 'train']}
                    </div>
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
      )}
    </div>
  );
};

export default MapPage;
