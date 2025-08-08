import { FC, useEffect } from 'react';
import { useHotelsList } from '../../hooks/useHotelsList.ts';
import HotelsListTable from './HotelsListTable.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import styles from '../../adminLayout.module.css';

const HotelsListSection: FC = () => {
  const {
    hotelsLists,
    currentManager,
    isCreatingList,
    newList,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortLists,
    handleDeleteList,
    handleCreateListClick,
    handleNewListChange,
    handleSaveNewList,
    handleCancelNewList,
    handleNavigateToListPage,
    handleCopyList,
    fetchHotelsLists,
  } = useHotelsList();

  useEffect(() => {
    if (!hotelsLists.length) fetchHotelsLists();
  }, []);

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <HotelsListTable
          hotelsLists={hotelsLists}
          currentManager={currentManager}
          onDeleteList={handleDeleteList}
          isCreatingList={isCreatingList}
          newList={newList}
          onNewListChange={handleNewListChange}
          onSaveNewList={handleSaveNewList}
          onCancelNewList={handleCancelNewList}
          nameInputRef={nameInputRef}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortLists}
          handleCreateListClick={handleCreateListClick}
          handleNavigateToListPage={handleNavigateToListPage}
          handleCopyList={handleCopyList}
        />
      )}
    </>
  );
};

export default HotelsListSection;
