import { useSelector } from 'react-redux';
import { DayCell } from './DayCell';
import { Map, Check, X, Plus, Hotel, Pin, Plane } from 'lucide-react';
import dayjs from 'dayjs';
import { selectIsLoggedIn, selectTravelProgram } from '../../store/selectors.ts';
import { useState } from 'react';
import styles from './index.module.css';
import { travelProgramService } from '../../services/travelProgram.service';
import { store } from '../../store';
import { travelProgramActions } from '../../store/reducers/travelProgram';

const ICON_OPTIONS = [
  { value: 'none', label: 'Map', icon: Map },
  { value: 'hotel', label: 'Hotel', icon: Hotel },
  { value: 'pin', label: 'Pin', icon: Pin },
  { value: 'plane', label: 'Plane', icon: Plane },
];

export function OverviewTable() {
  const program = useSelector(selectTravelProgram);
  const reviewData = program?.secondPageTables?.routeDetailsTable?.review || [];
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});
  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
    day: Date;
    numOfDay: string;
    activity?: {
      icon: string;
      dayActivity: {
        line1: string;
        line2?: string;
        line3?: string;
        isFlight: boolean;
        more?: string;
      };
    }[];
  } | null>(null);
  const [showIconDropdown, setShowIconDropdown] = useState<{ activityIndex: number } | null>(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const toggleActivity = (activityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  const handleRowClick = (index: number) => {
    if (isLoggedIn) {
      setEditableRow(index);
      // Инициализируем editedData текущими данными строки
      const currentRow = reviewData[index];
      setEditedData({
        day: new Date(currentRow.day),
        numOfDay: String(currentRow.numOfDay),
        activity: currentRow.activity.map(act => ({
          icon: act.icon,
          dayActivity: {
            line1: act.dayActivity.line1,
            line2: act.dayActivity.line2,
            line3: act.dayActivity.line3,
            isFlight: act.dayActivity.isFlight,
            more: act.dayActivity.more,
          },
        })),
      });
    }
  };

  const handleDateChange = (newDate: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        day: dayjs(newDate, 'DD.MM.YYYY').toDate(),
      });
    }
  };

  const handleTitleChange = (newTitle: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        numOfDay: newTitle,
      });
    }
  };

  const handleInputChange = (activityIndex: number, field: string, value: string) => {
    if (editedData && editedData.activity) {
      const updatedActivity = [...editedData.activity];
      updatedActivity[activityIndex] = {
        ...updatedActivity[activityIndex],
        dayActivity: {
          ...updatedActivity[activityIndex].dayActivity,
          [field]: value,
        },
      };
      setEditedData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          activity: updatedActivity,
        };
      });
    }
  };

  const handleIconChange = (activityIndex: number, iconValue: string) => {
    if (editedData && editedData.activity) {
      const updatedActivity = [...editedData.activity];
      updatedActivity[activityIndex] = {
        ...updatedActivity[activityIndex],
        icon: iconValue,
        dayActivity: {
          ...updatedActivity[activityIndex].dayActivity,
          isFlight: iconValue === 'plane',
        },
      };
      setEditedData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          activity: updatedActivity,
        };
      });
      // Диспатчим изменение иконки в стор
      store.dispatch(
        travelProgramActions.updateActivityIcon({
          dayIndex: editableRow!,
          activityIndex,
          icon: iconValue,
        }),
      );
      setShowIconDropdown(null);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editableRow !== null && editedData && program?._id) {
      try {
        await travelProgramService.updateReviewDay(program._id, editableRow, editedData);
        setEditableRow(null);
        setEditedData(null);
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditableRow(null);
    setEditedData(null);
  };

  const handleAddNewRow = async () => {
    if (program?._id) {
      try {
        const newDay = {
          day: new Date(),
          numOfDay: String(reviewData.length + 1),
          activity: [
            {
              icon: 'none',
              dayActivity: {
                line1: 'Title',
                line2: 'Subtitle',
                line3: 'One More Line',
                isFlight: false,
                more: 'more info',
              },
            },
          ],
        };

        await travelProgramService.updateReviewDay(program._id, reviewData.length, newDay);
      } catch (error) {
        console.error('Failed to add new row:', error);
      }
    }
  };

  const getIconComponent = (iconValue: string) => {
    const option = ICON_OPTIONS.find(opt => opt.value === iconValue);
    return option ? (
      <option.icon size={20} className={styles['activity-icon']} />
    ) : (
      <Map size={20} className={styles['activity-icon']} />
    );
  };

  return (
    <>
      <div className={`${styles['details-table']} ${styles['overview-table']}`}>
        <div className={styles['table-header']}>
          <div className={styles['header-cell']}>День</div>
          <div className={styles['header-cell']}>Активности</div>
        </div>
        {reviewData.map((dayData, index: number) => (
          <div
            key={index}
            className={styles['table-row']}
            onClick={() => handleRowClick(index)}
            style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
            <DayCell
              title={String(dayData.numOfDay)}
              subtitle={dayjs(dayData.day).format('dddd')}
              date={dayjs(dayData.day).format('DD MMMM YYYY')}
              isEditable={editableRow === index}
              onDateChange={handleDateChange}
              onTitleChange={handleTitleChange}
            />
            <div className={styles['activities-cell']}>
              {dayData.activity.map((activity, activityIndex) => (
                <div key={activity.id} className={styles['activity-item']}>
                  {editableRow === index ? (
                    <div className={styles['icon-selector']}>
                      <div
                        className={styles['icon-button']}
                        onClick={e => {
                          e.stopPropagation();
                          setShowIconDropdown(
                            showIconDropdown?.activityIndex === activityIndex
                              ? null
                              : { activityIndex },
                          );
                        }}>
                        {getIconComponent(activity.icon)}
                      </div>
                      {showIconDropdown?.activityIndex === activityIndex && (
                        <div className={styles['icon-dropdown']}>
                          {ICON_OPTIONS.map(option => (
                            <div
                              key={option.value}
                              className={styles['icon-option']}
                              onClick={e => {
                                e.stopPropagation();
                                handleIconChange(activityIndex, option.value);
                              }}>
                              <option.icon size={20} />
                              <span>{option.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    getIconComponent(activity.icon)
                  )}
                  <div className={styles['activity-details']}>
                    {editableRow === index ? (
                      <input
                        type="text"
                        defaultValue={activity.dayActivity.line1}
                        className={styles['editable-input']}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleInputChange(activityIndex, 'line1', e.target.value)}
                      />
                    ) : (
                      <div>{activity.dayActivity.line1}</div>
                    )}
                    {editableRow === index ? (
                      <input
                        type="text"
                        defaultValue={activity.dayActivity.line2}
                        className={styles['editable-input']}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleInputChange(activityIndex, 'line2', e.target.value)}
                      />
                    ) : (
                      <div>{activity.dayActivity.line2}</div>
                    )}
                    {editableRow === index ? (
                      <input
                        type="text"
                        defaultValue={activity.dayActivity.line3}
                        className={styles['editable-input']}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleInputChange(activityIndex, 'line3', e.target.value)}
                      />
                    ) : (
                      <div>{activity.dayActivity.line3}</div>
                    )}
                    {editableRow === index ? (
                      <div className={styles['activity-subtext']}>
                        <div className={styles['more-text']}>Дополнительная информация</div>
                        <input
                          type="text"
                          defaultValue={activity.dayActivity.more}
                          className={styles['editable-input']}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleInputChange(activityIndex, 'more', e.target.value)}
                        />
                      </div>
                    ) : (
                      activity.dayActivity.more && (
                        <div className={styles['activity-subtext']}>
                          <div
                            className={styles['more-text']}
                            onClick={e => toggleActivity(activity.id, e)}>
                            {expandedActivities[activity.id] ? 'СКРЫТЬ' : 'ПОДРОБНЕЕ'}
                          </div>
                          <div
                            className={`${styles['more-details']} ${
                              expandedActivities[activity.id] ? styles.expanded : ''
                            }`}>
                            {activity.dayActivity.more}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              {editableRow === index && (
                <div className={styles['edit-icons']}>
                  <button className={styles['edit-icon']} onClick={handleSave}>
                    <Check size={16} />
                  </button>
                  <button className={styles['edit-icon']} onClick={handleCancel}>
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <div className={styles['edit-icons-add-new-row']}>
          <button className={styles['edit-icon']} onClick={handleAddNewRow}>
            <Plus size={16} />
          </button>
        </div>
      )}
    </>
  );
}
