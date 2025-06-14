import { useEffect, useRef, useState } from 'react';
import { IUploadedImage } from '../../../types/uploadImage.types.ts';
import { imageService } from '../../../services/image.service.ts';
import { hotelService } from '../../../services/hotel.service.ts';

const useUploadOne = ({
  hotelId,
  onClose,
  isMany,
  galleryType,
}: {
  hotelId?: string;
  onClose: () => void;
  isMany?: boolean;
  galleryType?: 'hotelInfo.gallery' | 'roomInfo.gallery';
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<IUploadedImage[]>([]);

  // Загружаем все изображения при открытии модального окна
  useEffect(() => {
    if (!open) return;
    imageService.getAllImages().then(images => {
      setUploadedImages(images);
    });
  }, [open]);

  // Автоматически скрывать надпись об успехе через 2 секунды
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleTitleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    setError(null);
    setSuccess(false);
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      const response = await imageService.uploadMultipleImages(Array.from(files));

      if (response && response.images && response.images.length > 0) {
        setUploadedImages(prev => [...prev, ...response.images]);
      }

      setSuccess(true);
    } catch (e: unknown) {
      let message = 'Ошибка загрузки';
      if (typeof e === 'object' && e && 'message' in e) {
        message = (e as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (img: IUploadedImage) => {
    const id = img._id || img.id;
    if (!id) return;
    setLoading(true);
    try {
      await imageService.deleteImage(id);
      setUploadedImages(prev => prev.filter(i => (i._id || i.id) !== id));
      setSelectedImages(prev => prev.filter(i => (i._id || i.id) !== id));
    } catch (e) {
      let message = 'Ошибка удаления';
      if (typeof e === 'object' && e && 'message' in e) {
        message = (e as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const maxCells = Math.max(uploadedImages.length, 8);

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

export default useUploadOne;
