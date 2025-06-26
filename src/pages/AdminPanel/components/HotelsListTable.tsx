import { FC, RefObject, useState } from 'react';
import { Edit, Trash2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../AdminPanel.module.css';
import { IHotelsList } from '../../../services/hotelsList.service';
import dayjs from 'dayjs';
import { SectionHeader } from './SectionHeader.tsx';
import HotelEditPage from './HotelEditPage.tsx';
import HotelsListEditPage from './HotelsListEditPage.tsx';

interface HotelsListTableProps {
  hotelsLists: IHotelsList[];
  onDeleteList: (id: string) => void;
  isCreatingList?: boolean;
  newList?: Partial<IHotelsList>;
  onNewListChange?: (field: keyof IHotelsList, value: string) => void;
  onSaveNewList?: () => void;
  handleCreateListClick: () => void;
  handleNavigateToListPage: (id: string) => void;
  onCancelNewList?: () => void;
  nameInputRef?: RefObject<HTMLInputElement>;
  sortField?: keyof IHotelsList;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: keyof IHotelsList) => void;
}

const HotelsListTable: FC<HotelsListTableProps> = ({
  hotelsLists,
  onDeleteList,
  isCreatingList = false,
  newList = {},
  onNewListChange,
  onSaveNewList,
  onCancelNewList,
  nameInputRef,
  sortField,
  sortOrder,
  onSort,
  handleCreateListClick,
  handleNavigateToListPage,
}) => {
  const renderSortIcon = (field: keyof IHotelsList) => {
    if (!sortField || sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp size={16} className={styles.sortArrow} />
    ) : (
      <ChevronDown size={16} className={styles.sortArrow} />
    );
  };

  const [listEditId, setListEditId] = useState('');

  const handleEditListPage = (id: string) => {
    setListEditId(id);
  };

  if (listEditId)
    return <HotelsListEditPage id={listEditId} returnHandler={handleEditListPage} />;

  return (
    <>
      <SectionHeader
        title="Списки отелей"
        onCreateClick={handleCreateListClick}
        isCreating={isCreatingList}
      />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => onSort && onSort('name')}
                style={{ cursor: 'pointer', minWidth: 120 }}>
                Название
                <span className={styles.sortArrow}>{renderSortIcon('name')}</span>
              </th>
              <th
                onClick={() => onSort && onSort('description')}
                style={{ cursor: 'pointer', minWidth: 200 }}>
                Описание
                <span className={styles.sortArrow}>{renderSortIcon('description')}</span>
              </th>
              <th style={{ minWidth: 80 }}>Количество отелей</th>
              <th
                onClick={() => onSort && onSort('isActive')}
                style={{ cursor: 'pointer', minWidth: 100 }}>
                Статус
                <span className={styles.sortArrow}>{renderSortIcon('isActive')}</span>
              </th>
              <th
                onClick={() => onSort && onSort('createdAt')}
                style={{ cursor: 'pointer', minWidth: 120 }}>
                Дата создания
                <span className={styles.sortArrow}>{renderSortIcon('createdAt')}</span>
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {isCreatingList && (
              <tr className={styles.hotelCreateRow}>
                <td>
                  <input
                    ref={nameInputRef}
                    className={styles.hotelCreateInput}
                    type="text"
                    value={newList.name || ''}
                    onChange={(e) => onNewListChange && onNewListChange('name', e.target.value)}
                    placeholder="Название списка"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={newList.description || ''}
                    onChange={(e) =>
                      onNewListChange && onNewListChange('description', e.target.value)
                    }
                    placeholder="Описание"
                  />
                </td>
                <td>0</td>
                <td>
                  <span className={styles.statusActive}>Активен</span>
                </td>
                <td>{dayjs().format('DD.MM.YYYY')}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={onSaveNewList}
                      title="Сохранить">
                      <Check size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={onCancelNewList}
                      title="Отмена">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {hotelsLists.map((list) => (
              <tr key={list._id}>
                <td
                  className={styles.programName}
                  onClick={() => handleNavigateToListPage(list._id)}>
                  {list.name}
                </td>
                <td>{list.description || '-'}</td>
                <td>{list.metadata?.totalHotels || list.hotels?.length || 0}</td>
                <td>
                  <span className={list.isActive ? styles.statusActive : styles.statusInactive}>
                    {list.isActive ? 'Активен' : 'Неактивен'}
                  </span>
                </td>
                <td>{list.createdAt ? dayjs(list.createdAt).format('DD.MM.YYYY') : ''}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => list._id && handleEditListPage(list._id)}
                      title="Редактировать список">
                      <Edit size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => list._id && onDeleteList(list._id)}
                      title="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HotelsListTable;
