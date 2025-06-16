import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import IconLeftNav from '../../assets/icons/leftNav.svg';
import IconRightNav from '../../assets/icons/leftNav.svg';
import { ROOT_URL } from '../../constants/api.constants.ts';
import styles from './Days.module.css';
import ImageUploadHotels from '../ImageUploadModal/ImageUploadHotels.tsx';
import ImageUploadTravelProgram from '../ImageUploadModal/ImageUploadTravelProgram.tsx';
import { useSelector } from 'react-redux';
import { selectTravelProgram } from '../../store/selectors.ts';

const images = [
  {
    original: `${ROOT_URL}/upload/1749986233867-871879643.jpg`,
  },
  {
    original: `${ROOT_URL}/upload/1749986233867-871879643.jpg`,
  },
  {
    original: `${ROOT_URL}/upload/1749986233867-871879643.jpg`,
  },
];

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
      <ImageGallery
        items={images}
        showThumbnails={false}
        showBullets={true}
        renderLeftNav={(onClick: () => void, disabled: boolean) => (
          <LeftNav onClick={onClick} disabled={disabled} />
        )}
        renderRightNav={(onClick: () => void, disabled: boolean) => (
          <RightNav onClick={onClick} disabled={disabled} />
        )}
      />
    </div>
  );
};

export default DaysGallery;
