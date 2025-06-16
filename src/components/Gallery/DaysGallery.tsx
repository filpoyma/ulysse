import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import IconLeftNav from '../../assets/icons/leftNav.svg';
import IconRightNav from '../../assets/icons/leftNav.svg';

import styles from './Days.module.css';

import { useSelector } from 'react-redux';
import { selectTravelProgram, selectTravelProgramGallery } from '../../store/selectors.ts';
import ImageUploadTravelProgram from '../ImageUploadModal/ImageUploadTravelProgram.tsx';

const images = [
  {
    original: 'http://localhost:5000/upload/1750082607402-554255416.png',
  },
  {
    original: 'http://localhost:5000/upload/1750082607402-554255416.png',
  },
  {
    original: 'http://localhost:5000/upload/1750082607402-554255416.png',
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
  const images = useSelector(selectTravelProgramGallery);
  console.log('file-DaysGallery.tsx images:', images);
  return (
    <div className={styles.content}>
      <button
        onClick={() => {
          if (isLoggedIn) setIsModalOpen(true);
        }}>
        Edit
      </button>
      {isLoggedIn && program && (
        <ImageUploadTravelProgram
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          programId={program._id}
          isMany={true}
        />
      )}
      {images.length > 0 && (
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
      )}
    </div>
  );
};

export default DaysGallery;
