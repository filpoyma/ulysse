import { IUploadedImage } from '../../../types/uploadImage.types.ts';
import { restaurantService } from '../../../services/restaurant.service.ts';
import useModalGallery from './useModalGallery.tsx';
import { getErrorMessage } from '../../../utils/helpers.ts';

const useUploadRestaurantGallery = ({
  restaurantId,
  onClose,
  isMany,
  galleryType,
  belongsToId,
  open,
}: {
  restaurantId?: string;
  onClose: () => void;
  isMany?: boolean;
  galleryType?: 'gallery';
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
    if (!restaurantId) return;
    const imageId = img._id || img.id;
    if (!imageId) return;

    try {
      setLoading(true);
      if (isMany && galleryType) {
        // Для множественного выбора добавляем/удаляем изображение из выбранных
        const isSelected = selectedImages.some((i) => (i._id || i.id) === imageId);
        if (isSelected) {
          setSelectedImages((prev) => prev.filter((i) => (i._id || i.id) !== imageId));
        } else {
          setSelectedImages((prev) => [...prev, img]);
        }
      } else {
        // Для одиночного выбора обновляем главное изображение
        await restaurantService.updateTitleImage(restaurantId, imageId);
        setSuccess(true);
        onClose();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Сохранение выбранных изображений в галерею
  const handleSaveGallery = async () => {
    if (!restaurantId || !galleryType || selectedImages.length === 0) return;

    try {
      setLoading(true);
      const imageIds = selectedImages.map((img) => img._id || img.id).filter(Boolean) as string[];
      await restaurantService.updateGallery(restaurantId, imageIds);
      setSuccess(true);
      setSelectedImages([]);
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
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

export default useUploadRestaurantGallery; 