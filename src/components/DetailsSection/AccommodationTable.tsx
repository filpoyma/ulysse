import styles from './index.module.css';
import { useSelector } from 'react-redux';
import { selectTravelProgram, selectIsLoggedIn } from '../../store/selectors.ts';
import { useState } from 'react';
import { Check, Plus, X, Minus } from 'lucide-react';
import { travelProgramService } from '../../services/travelProgram.service';

export function AccommodationTable() {
  const program = useSelector(selectTravelProgram);
  const accommodationData = program?.secondPageTables?.accommodation || [];
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
    period: string;
    hotelName: string;
    details: string;
    numOfNights: number;
  } | null>(null);

  const handleRowClick = (index: number) => {
    if (isLoggedIn) {
      setEditableRow(index);
      setEditedData({
        period: accommodationData[index].period,
        hotelName: accommodationData[index].hotelName,
        details: accommodationData[index].details,
        numOfNights: accommodationData[index].numOfNights,
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: field === 'numOfNights' ? Number(value) : value,
      });
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editableRow !== null && editedData && program?._id) {
      try {
        await travelProgramService.updateAccommodationRow(program._id, editableRow, editedData);
        setEditableRow(null);
        setEditedData(null);
      } catch (error) {
        console.error(error);
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
        const newDayPeriod = {
          period: 'n - m',
          hotelName: 'new Hotel',
          details: 'new Details',
          numOfNights: 3,
        };

        await travelProgramService.updateAccommodationRow(
          program._id,
          accommodationData.length,
          newDayPeriod,
        );
      } catch (error) {
        console.error('Failed to add new row:', error);
      }
    }
  };

  return (
    <>
      <div className={`${styles['details-table']} ${styles['accommodation-table']}`}>
        <div className={styles['table-header']}>
          <div className={styles['header-cell']}>День</div>
          <div className={styles['header-cell']}>Проживание</div>
          <div className={styles['header-cell']}>Детали</div>
          <div className={styles['header-cell']}>Ночи</div>
        </div>
        {accommodationData.map((row, index) => (
          <div key={index} className={styles['table-row']} style={{ position: 'relative' }}>
            {/* 4 ячейки */}
            <div
              onClick={() => handleRowClick(index)}
              style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
              {editableRow === index ? (
                <input
                  type="text"
                  defaultValue={editedData?.period}
                  className={styles['editable-input']}
                  onClick={e => e.stopPropagation()}
                  onChange={e => handleInputChange('period', e.target.value)}
                />
              ) : (
                row.period
              )}
            </div>
            <div
              onClick={() => handleRowClick(index)}
              style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
              {editableRow === index ? (
                <input
                  type="text"
                  defaultValue={editedData?.hotelName}
                  className={styles['editable-input']}
                  onClick={e => e.stopPropagation()}
                  onChange={e => handleInputChange('hotelName', e.target.value)}
                />
              ) : (
                row.hotelName
              )}
            </div>
            <div
              onClick={() => handleRowClick(index)}
              style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
              {editableRow === index ? (
                <input
                  type="text"
                  defaultValue={editedData?.details}
                  className={styles['editable-input']}
                  onClick={e => e.stopPropagation()}
                  onChange={e => handleInputChange('details', e.target.value)}
                />
              ) : (
                row.details
              )}
            </div>
            <div
              onClick={() => handleRowClick(index)}
              style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
              {editableRow === index ? (
                <input
                  type="number"
                  defaultValue={editedData?.numOfNights}
                  className={styles['editable-input']}
                  onClick={e => e.stopPropagation()}
                  onChange={e => handleInputChange('numOfNights', e.target.value)}
                />
              ) : (
                row.numOfNights
              )}
            </div>
          </div>
        ))}
        {editableRow !== null && (
          <div
            className={styles['edit-controls']}
            style={{ marginTop: 42, display: 'flex', justifyContent: 'flex-end' }}>
            <div className={styles['edit-icons']}>
              <button className={styles['edit-icon']} onClick={handleCancel}>
                <X size={16} />
              </button>
              <button
                className={`${styles['edit-icon']} ${styles['del-icon']}`}
                onClick={handleCancel}>
                <Minus size={16} />
              </button>
              <button className={styles['edit-icon']} onClick={handleSave}>
                <Check size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoggedIn && editableRow === null && (
        <div className={styles['edit-icons-add-new-row']}>
          <button className={styles['edit-icon']} onClick={handleAddNewRow}>
            <Plus size={16} />
          </button>
        </div>
      )}
    </>
  );
}
