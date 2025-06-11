import React, { useRef, useState, useEffect } from 'react';
import './ImageUploadModal.css';
import { imageService } from '../../services/image.service';
import { ROOT_URL } from '../../constants/api.constants';
import { useDispatch } from 'react-redux';

import { createArrayFromNumberWithId } from '../../utils/helpers.ts';
import { IUploadedImage } from '../../types/travelProgram.types.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  hotelId?: string;
}

const ImageUploadHotels: React.FC<Props> = ({ open, onClose, hotelId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<IUploadedImage[]>([]);

  // Загружаем все изображения при открытии модального окна
  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const images = (await imageService.getAllImages()) as IUploadedImage[];
        setUploadedImages(images);
      } catch {
        // Не критично, просто не показываем картинки
      }
    })();
  }, [open]);

  // Автоматически скрывать надпись об успехе через 2 секунды
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (!open) return null;

  const handleTitleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    setError(null);
    setSuccess(false);
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const response = await imageService.uploadImage(file);
      if (response && response.image && response.image.path) {
        setUploadedImages(prev => [...prev, response.image]);
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

  const maxCells = Math.max(uploadedImages.length, 9);

  // Клик по превью для выбора фона
  const handlePreviewClick = async (img: IUploadedImage) => {
    if (!hotelId) return;
    const imageId = img._id || img.id;
    if (!imageId) return;
    try {
    } catch {
      setError('Ошибка выбора фоновой картинки');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative' }}>
        <button
          className="modal-close-top"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
          title="Закрыть">
          <span className="modal-cross" style={{ fontSize: 28, color: '#222', lineHeight: 1 }}>
            ×
          </span>
        </button>
        <div className="modal-header">
          <h3
            className="modal-title-upload"
            onClick={handleTitleClick}
            style={{ cursor: 'pointer' }}>
            ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ
          </h3>
          {error ? (
            <div style={{ color: 'red', marginBottom: 8 }}>{`${error}`}</div>
          ) : success ? (
            <div style={{ color: 'green', marginBottom: 8 }}>файл успешно загружен</div>
          ) : (
            <p className="modal-subtext">размер изображения не менее 1080x1080 пикселей</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="modal-grid-wrapper">
          <div className="modal-grid">
            {createArrayFromNumberWithId(maxCells).map((id, i) => {
              const img = uploadedImages[i];
              return (
                <div
                  className="modal-cell"
                  key={id}
                  style={{ position: 'relative', width: 120, height: 120 }}>
                  {img ? (
                    <>
                      <img
                        src={`${ROOT_URL}/` + img.path.replace(/^\//, '')}
                        alt="preview"
                        onClick={() => handlePreviewClick(img)}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 8,
                          cursor: 'pointer',
                        }}
                      />
                      <button
                        className="modal-delete-btn"
                        onClick={() => handleDelete(img)}
                        title="Удалить изображение">
                        <span
                          className="modal-cross"
                          style={{ fontSize: 28, color: '#222', lineHeight: 1 }}>
                          ×
                        </span>
                      </button>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <button className="modal-close" onClick={onClose} disabled={loading}>
          {loading ? 'Загрузка...' : 'Закрыть'}
        </button>
      </div>
    </div>
  );
};

export default ImageUploadHotels;
