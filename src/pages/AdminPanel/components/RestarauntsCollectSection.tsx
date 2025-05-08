import { FC, useEffect } from "react";
import OverlayLoader from "../../../components/Loader/OverlayLoader";
import { SectionHeader } from "./SectionHeader";
import RestarauntsCollectTable from "./RestarauntsCollectTable";
import { useRestarauntsCollect } from "../hooks/useRestarauntsCollect";
import styles from "../AdminPanel.module.css";

export const RestarauntsCollectSection: FC = () => {
  const {
    restaraunts,
    loading,
    error,
    isCreating,
    newRestaraunt,
    editingRestarauntId,
    editingRestarauntData,
    nameInputRef,
    fetchRestaraunts,
    handleCreateRestarauntClick,
    handleNewRestarauntChange,
    handleSaveNewRestaraunt,
    handleCancelNewRestaraunt,
    handleRestarauntClick,
    handleEditRestarauntChange,
    handleSaveEditRestaraunt,
    handleCancelEditRestaraunt,
    handleDeleteRestaraunt,
  } = useRestarauntsCollect();

  useEffect(() => {
    if (!restaraunts.length) fetchRestaraunts();
  }, []);

  return (
    <div className={styles.section}>
      <SectionHeader
        title="Список ресторанов"
        onCreateClick={handleCreateRestarauntClick}
        isCreating={isCreating}
      />
      {error && <div className={styles.error}>{error}</div>}
      {<OverlayLoader isLoading={loading} />}
      <RestarauntsCollectTable
        restaraunts={restaraunts}
        isCreatingRestaraunt={isCreating}
        newRestaraunt={newRestaraunt}
        onNewRestarauntChange={handleNewRestarauntChange}
        onSaveNewRestaraunt={handleSaveNewRestaraunt}
        onCancelNewRestaraunt={handleCancelNewRestaraunt}
        nameInputRef={nameInputRef}
        editingRestarauntId={editingRestarauntId}
        editingRestarauntData={editingRestarauntData}
        onRestarauntClick={handleRestarauntClick}
        onEditRestarauntChange={handleEditRestarauntChange}
        onSaveEditRestaraunt={handleSaveEditRestaraunt}
        onCancelEditRestaraunt={handleCancelEditRestaraunt}
        onDeleteRestaraunt={handleDeleteRestaraunt}
      />
    </div>
  );
};
