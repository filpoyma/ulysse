import { FC, useEffect } from 'react';
import { useHotelsCollect } from '../hooks/useHotelsCollect.ts';
import HotelsCollectTable from './HotelsCollectTable.tsx';
import { Loader } from '../../../components/Loader/Loader';
import styles from '../AdminPanel.module.css';

export const HotelsCollectSection: FC = () => {
  const {
    hotels,
    isCreatingHotel,
    newHotel,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortHotels,
    handleDeleteHotel,
    handleCreateHotelClick,
    handleNewHotelChange,
    handleSaveNewHotel,
    handleCancelNewHotel,
    fetchHotels,
  } = useHotelsCollect();

  useEffect(() => {
    if (!hotels.length) fetchHotels();
  }, []);

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <HotelsCollectTable
          hotels={hotels}
          onDeleteHotel={handleDeleteHotel}
          isCreatingHotel={isCreatingHotel}
          newHotel={newHotel}
          onNewHotelChange={handleNewHotelChange}
          onSaveNewHotel={handleSaveNewHotel}
          onCancelNewHotel={handleCancelNewHotel}
          nameInputRef={nameInputRef}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortHotels}
          handleCreateHotelClick={handleCreateHotelClick}
        />
      )}
    </>
  );
};
