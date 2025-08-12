import { FC } from 'react';
import { useRestaurantsList } from '../../hooks/useRestaurantsList.ts';
import RestaurantsListTable from './RestaurantsListTable.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import styles from '../../adminLayout.module.css';

const RestaurantsListSection: FC = () => {
  const {
    restaurantsLists,
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
  } = useRestaurantsList();

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <RestaurantsListTable
          restaurantsLists={restaurantsLists}
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

export default RestaurantsListSection;
