import { FC, useEffect } from "react";
import { useHotelsCollect } from "../hooks/useHotelsCollect.ts";
import { SectionHeader } from "./SectionHeader";
import HotelsCollectTable from "./HotelsCollectTable.tsx";
import styles from "../AdminPanel.module.css";

export const HotelsCollectSection: FC = () => {
  const {
    hotels,
    isCreatingHotel,
    error,
    loading,
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
    fetchHotels();
  }, [fetchHotels]);

  return (
    <div className={styles.section}>
      <SectionHeader
        title="Отели"
        onCreateClick={handleCreateHotelClick}
        isCreating={isCreatingHotel}
      />

      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Загрузка...</div>}

      {hotels && (
        <HotelsCollectTable
          hotels={hotels}
          onHotelClick={handleHotelClick}
          onDeleteHotel={handleDeleteHotel}
          isCreatingHotel={isCreatingHotel}
          onNewHotelChange={handleNewHotelChange}
          onSaveNewHotel={handleSaveNewHotel}
          onCancelNewHotel={handleCancelNewHotel}
          onEditHotelChange={handleEditHotelChange}
          onSaveEditHotel={handleSaveEditHotel}
          onCancelEditHotel={handleCancelEditHotel}
        />
      )}
    </div>
  );
};
