import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import IconLeftNav from '../../assets/icons/leftNav.svg';
import IconRightNav from '../../assets/icons/leftNav.svg';
import { ROOT_URL } from '../../constants/api.constants';

import styles from './Days.module.css';

import { useSelector } from 'react-redux';
import {
  selectTravelProgram,
  selectTravelProgramGallery,
  selectTravelProgramImages,
} from '../../store/selectors.ts';
import ImageUploadTravelProgram from '../ImageUploadModal/ImageUploadTravelProgram.tsx';
import { travelProgramService } from '../../services/travelProgram.service';

const LeftNav = React.memo(({ disabled, onClick }: { onClick: () => void; disabled: boolean }) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide">
      <IconLeftNav />
    </button>
  );
});
const RightNav = React.memo(({ disabled, onClick }: { onClick: () => void; disabled: boolean }) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide">
      <IconRightNav />
    </button>
  );
});
const DaysGallery = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const program = useSelector(selectTravelProgram);
  const imagesForGallery = useSelector(selectTravelProgramGallery);
  const images = useSelector(selectTravelProgramImages);

  const handleDeleteImage = async (imageId: string) => {
    if (!program?._id || !imageId) return;

    try {
      const updatedImages = images.filter(img => img._id !== imageId);
      const imageIds = updatedImages.map(img => img._id || '');

      await travelProgramService.updateGallery(program._id, imageIds);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Ошибка при удалении изображения');
    }
  };

  return (
    <div className={styles.content}>
      {isLoggedIn && program && (
        <ImageUploadTravelProgram
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          programId={program._id}
          isMany={true}
        />
      )}
      {isLoggedIn && (
        <div className={styles.scrollableGallery}>
          <div className={styles.addImagePlaceholder} onClick={() => setIsModalOpen(true)} />
          {images.map((image, index) => (
            <div key={image._id} className={styles.imageWrapper}>
              <img
                src={`${ROOT_URL}/${image.path.replace(/^\//, '')}`}
                alt={`Image ${index + 1}`}
                className={styles.scrollableImage}
              />
              <button
                className={styles.deleteButton}
                onClick={e => {
                  e.stopPropagation();
                  if (image._id) {
                    handleDeleteImage(image._id);
                  }
                }}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {imagesForGallery.length > 0 && (
        <ImageGallery
          items={imagesForGallery}
          showThumbnails={false}
          showBullets={true}
          renderLeftNav={(onClick: () => void, disabled: boolean) => (
            <LeftNav onClick={onClick} disabled={disabled} />
          )}
          renderRightNav={(onClick: () => void, disabled: boolean) => (
            <RightNav onClick={onClick} disabled={disabled} />
          )}
        />
      )}
    </div>
  );
};

export default DaysGallery;
