import { FC, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";
import RestarauntsCollectTable from "./RestarauntsCollectTable";
import { useRestarauntsCollect } from "../hooks/useRestarauntsCollect";
import styles from "../AdminPanel.module.css";
import { Loader } from "../../../components/Loader/Loader";
import RestaurantEditPage from "./RestaurantEditPage";

export const RestarauntsCollectSection: FC<{ id: string | null }> = ({ id }) => {
  const {
    restaraunts,
    loading,
    error,
    isCreatingRestaraunt,
    newRestaraunt,
    sortField,
    sortOrder,
    nameInputRef,
    handleSortRestaraunts,
    handleDeleteRestaraunt,
    handleCreateRestarauntClick,
    handleNewRestarauntChange,
    handleSaveNewRestaraunt,
    handleCancelNewRestaraunt,
    fetchRestaraunts,
    handleRestarauntEdit,
    editingRestarauntId
  } = useRestarauntsCollect(id);

  useEffect(() => {
    if (!restaraunts.length) fetchRestaraunts();
  }, []);

  if(editingRestarauntId) {
    return <RestaurantEditPage restaurantId={editingRestarauntId} returnHandler={handleRestarauntEdit} />
  }

  return (
    <div className={styles.section}>
      <SectionHeader
        title="Список ресторанов"
        onCreateClick={handleCreateRestarauntClick}
        isCreating={isCreatingRestaraunt}
      />
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <RestarauntsCollectTable
          restaraunts={restaraunts}
          onRestarauntEdit={handleRestarauntEdit}
          onDeleteRestaraunt={handleDeleteRestaraunt}
          isCreatingRestaraunt={isCreatingRestaraunt}
          newRestaraunt={newRestaraunt}
          onNewRestarauntChange={handleNewRestarauntChange}
          onSaveNewRestaraunt={handleSaveNewRestaraunt}
          onCancelNewRestaraunt={handleCancelNewRestaraunt}
          nameInputRef={nameInputRef}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortRestaraunts}
        />
      )}
    </div>
  );
};
