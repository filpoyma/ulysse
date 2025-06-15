import { IUploadedImage } from '../../../types/uploadImage.types.ts';
import { hotelService } from '../../../services/hotel.service.ts';
import { TGalleryType } from '../../../types/hotel.types.ts';
import useModalGallery from './useModalGallery.tsx';

const useUploadHotelGallery = ({
  hotelId,
  onClose,
  isMany,
  galleryType,
  belongsToId,
  open,
}: {
  hotelId?: string;
  onClose: () => void;
  isMany?: boolean;
  galleryType?: TGalleryType;
  belongsToId?: string;
  open: boolean;
}) => {
  const {
    selectedImages,
    setLoading,
    setSelectedImages,
    setSuccess,
    setError,
    maxCells,
    handleDelete,
    handleFileChange,
    handleTitleClick,
    fileInputRef,
    loading,
    error,
    success,
    uploadedImages,
  } = useModalGallery({ belongsToId, open });

  // Клик по превью для выбора изображения
  const handlePreviewClick = async (img: IUploadedImage) => {
    if (!hotelId) return;
    const imageId = img._id || img.id;
    if (!imageId) return;

    try {
      setLoading(true);
      if (isMany && galleryType) {
        // Для множественного выбора добавляем/удаляем изображение из выбранных
        const isSelected = selectedImages.some(i => (i._id || i.id) === imageId);
        if (isSelected) {
          setSelectedImages(prev => prev.filter(i => (i._id || i.id) !== imageId));
        } else {
          setSelectedImages(prev => [...prev, img]);
        }
      } else {
        // Для одиночного выбора обновляем главное изображение
        await hotelService.updateMainImage(hotelId, imageId);
        setSuccess(true);
        onClose();
      }
    } catch (e) {
      let message = 'Ошибка обновления картинки';
      if (typeof e === 'object' && e && 'message' in e) {
        message = (e as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Сохранение выбранных изображений в галерею
  const handleSaveGallery = async () => {
    if (!hotelId || !galleryType || selectedImages.length === 0) return;

    try {
      setLoading(true);
      const imageIds = selectedImages.map(img => img._id || img.id).filter(Boolean) as string[];
      await hotelService.updateGallery(hotelId, galleryType, imageIds);
      setSuccess(true);
      setSelectedImages([]);
      onClose();
    } catch (e) {
      let message = 'Ошибка сохранения галереи';
      if (typeof e === 'object' && e && 'message' in e) {
        message = (e as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePreviewClick,
    handleSaveGallery,
    maxCells,
    handleDelete,
    handleFileChange,
    handleTitleClick,
    fileInputRef,
    loading,
    error,
    success,
    uploadedImages,
    selectedImages,
  };
};

export default useUploadHotelGallery;
