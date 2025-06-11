import { FC, RefObject, useState } from 'react';
import { Edit, Trash2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../AdminPanel.module.css';
import { IHotel } from '../../../types/hotel.types.ts';
import dayjs from 'dayjs';
import { CountryAutocomplete } from '../../../components/CountryAutocomplete/CountryAutocomplete';
import HotelEditPage from './HotelEditPage.tsx';
import { SectionHeader } from './SectionHeader.tsx';

interface HotelsTableProps {
  hotels: IHotel[];
  onDeleteHotel: (id: string) => void;
  isCreatingHotel?: boolean;
  newHotel?: Partial<IHotel>;
  onNewHotelChange?: (field: keyof IHotel, value: string) => void;
  onSaveNewHotel?: () => void;
  handleCreateHotelClick: () => void;
  onCancelNewHotel?: () => void;
  nameInputRef?: RefObject<HTMLInputElement>;
  sortField?: keyof IHotel;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: keyof IHotel) => void;
}

const HotelsTable: FC<HotelsTableProps> = ({
  hotels,
  onDeleteHotel,
  isCreatingHotel = false,
  newHotel = {},
  onNewHotelChange,
  onSaveNewHotel,
  onCancelNewHotel,
  nameInputRef,
  sortField,
  sortOrder,
  onSort,
  handleCreateHotelClick,
}) => {
  const [hotelEditId, setHotelEditId] = useState('');

  const renderSortIcon = (field: keyof IHotel) => {
    if (!sortField || sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp size={16} className={styles.sortArrow} />
    ) : (
      <ChevronDown size={16} className={styles.sortArrow} />
    );
  };

  const handleHotelClick = (id: string) => {
    setHotelEditId(id);
  };

  if (hotelEditId) return <HotelEditPage hotelId={hotelEditId} returnHandler={handleHotelClick} />;

  return (
    <>
      <SectionHeader
        title="Список отелей"
        onCreateClick={handleCreateHotelClick}
        isCreating={isCreatingHotel}
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
                onClick={() => onSort && onSort('country')}
                style={{ cursor: 'pointer', minWidth: 100 }}>
                Страна
                <span className={styles.sortArrow}>{renderSortIcon('country')}</span>
              </th>
              <th
                onClick={() => onSort && onSort('link')}
                style={{ cursor: 'pointer', minWidth: 100 }}>
                Ссылка
                <span className={styles.sortArrow}>{renderSortIcon('link')}</span>
              </th>
              <th
                onClick={() => onSort && onSort('region')}
                style={{ cursor: 'pointer', minWidth: 100 }}>
                Регион
                <span className={styles.sortArrow}>{renderSortIcon('region')}</span>
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
            {isCreatingHotel && (
              <tr className={styles.hotelCreateRow}>
                <td>
                  <input
                    ref={nameInputRef}
                    className={styles.hotelCreateInput}
                    type="text"
                    value={newHotel.name || ''}
                    onChange={e => onNewHotelChange && onNewHotelChange('name', e.target.value)}
                    placeholder="Название"
                  />
                </td>
                <td>
                  <CountryAutocomplete
                    value={newHotel.country || ''}
                    onChange={value => onNewHotelChange && onNewHotelChange('country', value)}
                    className={styles.hotelCreateInput}
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={newHotel.link || ''}
                    onChange={e => onNewHotelChange && onNewHotelChange('link', e.target.value)}
                    placeholder="Ссылка"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={newHotel.region || ''}
                    onChange={e => onNewHotelChange && onNewHotelChange('region', e.target.value)}
                    placeholder="Регион"
                  />
                </td>
                <td colSpan={1}></td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={onSaveNewHotel}
                      title="Сохранить">
                      <Check size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={onCancelNewHotel}
                      title="Отмена">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {hotels.map(hotel => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.country}</td>
                <td>{hotel.link}</td>
                <td>{hotel.region}</td>
                <td>{hotel.createdAt ? dayjs(hotel.createdAt).format('DD.MM.YYYY') : ''}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => hotel._id && handleHotelClick(hotel._id)}
                      title="Редактировать">
                      <Edit size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => hotel._id && onDeleteHotel(hotel._id)}
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

export default HotelsTable;
