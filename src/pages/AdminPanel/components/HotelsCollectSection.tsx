import { FC, useEffect } from "react";
import { useHotelsCollect } from "../hooks/useHotelsCollect.ts";
import { SectionHeader } from "./SectionHeader";
import HotelsCollectTable from "./HotelsCollectTable.tsx";
import { Loader } from "../../../components/Loader/Loader";
import styles from "../AdminPanel.module.css";

export const HotelsCollectSection: FC = () => {
  const {
    hotels,
    isCreatingHotel,
    newHotel,
    editingHotelId,
    editingHotelData,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortHotels,
    handleHotelClick,
    handleEditHotelChange,
    handleSaveEditHotel,
    handleCancelEditHotel,
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
      <SectionHeader
        title="Список отелей"
        onCreateClick={handleCreateHotelClick}
        isCreating={isCreatingHotel}
      />
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <HotelsCollectTable
          hotels={hotels}
          onHotelClick={handleHotelClick}
          onDeleteHotel={handleDeleteHotel}
          isCreatingHotel={isCreatingHotel}
          newHotel={newHotel}
          onNewHotelChange={handleNewHotelChange}
          onSaveNewHotel={handleSaveNewHotel}
          onCancelNewHotel={handleCancelNewHotel}
          nameInputRef={nameInputRef}
          editingHotelId={editingHotelId}
          editingHotelData={editingHotelData}
          onEditHotelChange={handleEditHotelChange}
          onSaveEditHotel={handleSaveEditHotel}
          onCancelEditHotel={handleCancelEditHotel}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortHotels}
        />
      )}
    </>
  );
};
