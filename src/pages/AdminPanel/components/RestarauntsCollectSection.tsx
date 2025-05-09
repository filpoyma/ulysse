import { FC, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";
import RestarauntsCollectTable from "./RestarauntsCollectTable";
import { useRestarauntsCollect } from "../hooks/useRestarauntsCollect";
import styles from "../AdminPanel.module.css";
import { Loader } from "../../../components/Loader/Loader";

export const RestarauntsCollectSection: FC = () => {
  const {
    restaraunts,
    loading,
    error,
    isCreatingRestaraunt,
    newRestaraunt,
    editingRestarauntId,
    editingRestarauntData,
    sortField,
    sortOrder,
    nameInputRef,
    handleSortRestaraunts,
    handleRestarauntClick,
    handleEditRestarauntChange,
    handleSaveEditRestaraunt,
    handleCancelEditRestaraunt,
    handleDeleteRestaraunt,
    handleCreateRestarauntClick,
    handleNewRestarauntChange,
    handleSaveNewRestaraunt,
    handleCancelNewRestaraunt,
    fetchRestaraunts,
  } = useRestarauntsCollect();

  useEffect(() => {
    if (!restaraunts.length) fetchRestaraunts();
  }, []);

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
          onRestarauntClick={handleRestarauntClick}
          onDeleteRestaraunt={handleDeleteRestaraunt}
          isCreatingRestaraunt={isCreatingRestaraunt}
          newRestaraunt={newRestaraunt}
          onNewRestarauntChange={handleNewRestarauntChange}
          onSaveNewRestaraunt={handleSaveNewRestaraunt}
          onCancelNewRestaraunt={handleCancelNewRestaraunt}
          nameInputRef={nameInputRef}
          editingRestarauntId={editingRestarauntId}
          editingRestarauntData={editingRestarauntData}
          onEditRestarauntChange={handleEditRestarauntChange}
          onSaveEditRestaraunt={handleSaveEditRestaraunt}
          onCancelEditRestaraunt={handleCancelEditRestaraunt}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortRestaraunts}
        />
      )}
    </div>
  );
};
