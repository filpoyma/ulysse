import React from 'react';
import './ImageUploadModal.css';
import useUploadRestaurantGallery from './hooks/useUploadRestaurantGallery.tsx';
import ModalGallery from './ModalGallery.tsx';

interface Props {
  open: boolean;
  onClose: () => void;
  restaurantId?: string;
  isMany: boolean;
  galleryType?: 'gallery';
  belongsToId?: string;
}

const ImageUploadRestaurants: React.FC<Props> = ({
  open,
  onClose,
  restaurantId,
  isMany,
  galleryType,
  belongsToId,
}) => {
  const {
    handleTitleClick,
    handleFileChange,
    handlePreviewClick,
    handleDelete,
    handleSaveGallery,
    uploadedImages,
    selectedImages,
    fileInputRef,
    error,
    success,
    loading,
    maxCells,
  } = useUploadRestaurantGallery({ restaurantId, onClose, isMany, galleryType, open, belongsToId });

  if (!open) return null;

  return (
    <ModalGallery
      handleTitleClick={handleTitleClick}
      handleFileChange={handleFileChange}
      handlePreviewClick={handlePreviewClick}
      handleDelete={handleDelete}
      handleSaveGallery={handleSaveGallery}
      uploadedImages={uploadedImages}
      selectedImages={selectedImages}
      fileInputRef={fileInputRef}
      error={error}
      success={success}
      loading={loading}
      maxCells={maxCells}
      onClose={onClose}
      isMany={isMany}
    />
  );
};

export default ImageUploadRestaurants; 