import React from 'react';
import './ImageUploadModal.css';

import { ROOT_URL } from '../../constants/api.constants';

import { createArrayFromNumberWithId } from '../../utils/helpers.ts';
import useUploadOne from './hooks/useUploadOne.tsx';

interface Props {
  open: boolean;
  onClose: () => void;
  hotelId?: string;
  isMany: boolean;
  galleryType?: 'hotelInfo.gallery' | 'roomInfo.gallery';
}

const ImageUploadHotels: React.FC<Props> = ({ open, onClose, hotelId, isMany, galleryType }) => {
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
  } = useUploadOne({ hotelId, onClose, isMany, galleryType });

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative' }}>
        <button className="modal-close-top" onClick={onClose} title="Закрыть">
          <span className="modal-cross">×</span>
        </button>
        <div className="modal-header">
          <h3 className="modal-title-upload" onClick={handleTitleClick}>
            ЗАГРУЗИТЬ ИЗОБРАЖЕНИЯ
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
            multiple
          />
        </div>
        <div className="modal-grid-wrapper">
          <div className="modal-grid">
            {createArrayFromNumberWithId(maxCells).map((id, i) => {
              const img = uploadedImages[i];
              const isSelected = img && selectedImages.some(selected => (selected._id || selected.id) === (img._id || img.id));
              return (
                <div className="modal-cell" key={id}>
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
                          border: isSelected ? '3px solid #4CAF50' : 'none',
                        }}
                      />
                      <button
                        className="modal-delete-btn"
                        onClick={() => handleDelete(img)}
                        title="Удалить изображение">
                        <span className="modal-cross">×</span>
                      </button>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          {isMany && selectedImages.length > 0 && (
            <button 
              className="modal-save-btn" 
              onClick={handleSaveGallery} 
              disabled={loading}
            >
              {loading ? 'Сохранение...' : 'Сохранить выбранные'}
            </button>
          )}
          <button className="modal-close" onClick={onClose} disabled={loading}>
            {loading ? 'Загрузка...' : 'Закрыть'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadHotels;
