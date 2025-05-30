import React, { useState } from 'react';
import styles from './MapPage.module.css';
import IconElipses from '../../assets/icons/mapIcons/list/elipses.svg';
import { useSelector } from 'react-redux';
import { selectLogisticsData, selectTravelProgram } from '../../store/selectors.ts';
import iconsMapList from '../../assets/icons/mapIcons/list';
import { X, Check, Edit } from 'lucide-react';
import { mapService } from '../../services/map.service';
import { RouteType } from '../../types/map.types';

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

const MapPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const logistics = useSelector(selectLogisticsData);
  const program = useSelector(selectTravelProgram);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLogistics, setEditedLogistics] = useState(logistics);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedLogistics(logistics);
  };

  const handleSave = async () => {
    if (!program?._id) return;

    try {
      setIsSaving(true);
      await mapService.updateLogistics(program._id, editedLogistics);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save logistics:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedLogistics(logistics);
  };

  const handleInputChange = (id: string, field: string, value: string | number[] | RouteType) => {
    setEditedLogistics(prev =>
      prev.map(item => (item._id === id ? { ...item, [field]: value } : item)),
    );
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
                {editedLogistics.map(item => (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="text"
                        value={item.city}
                        onChange={e => handleInputChange(item._id, 'city', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={`${item.coordinates[0]}, ${item.coordinates[1]}`}
                        onChange={e => {
                          const [lat, lng] = e.target.value
                            .split(',')
                            .map(coord => parseFloat(coord.trim()));
                          if (!isNaN(lat) && !isNaN(lng)) {
                            handleInputChange(item._id, 'coordinates', [lat, lng]);
                          }
                        }}
                      />
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
