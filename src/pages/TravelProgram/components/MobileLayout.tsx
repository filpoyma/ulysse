import React from 'react';
import { IFirstPageData } from '../../../types/travelProgram.types';
import FirstPage from '../../../components/FirstPage/FirstPage';
import { DetailsSection } from '../../../components/DetailsSection';
import MapBox from '../../../components/MapBox/MapBoxCustomLayer.component';
import MapPage from '../../../components/MapPage/MapPage';
import styles from '../TravelProgram.module.css';

interface MobileLayoutProps {
  firstPageBg: string;
  secondPageBg: string;
  firstPage: IFirstPageData;
  programName: string | undefined;
  isLoggedIn: boolean;
  onScrollToDetails: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  detailsRef: React.RefObject<HTMLElement>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  firstPageBg,
  secondPageBg,
  firstPage,
  programName,
  isLoggedIn,
  onScrollToDetails,
  setIsModalOpen,
  detailsRef,
}) => (
  <div className={styles.pageContainer}>
    <div className={styles.backgroundImage}>
      <img
        src={firstPageBg}
        alt="First page background"
        onClick={() => setIsModalOpen(true)}
        className={styles.leftSideBgImage}
      />
    </div>
    <section>
      <FirstPage
        firstPage={firstPage}
        programName={programName}
        isLoggedIn={isLoggedIn}
        onScrollToDetails={onScrollToDetails}
      />
    </section>
    <div className={styles.backgroundImage}>
      <img
        src={secondPageBg}
        alt="Second page background"
        onClick={() => setIsModalOpen(true)}
        className={styles.leftSideBgImage}
      />
    </div>
    <section>
      <DetailsSection ref={detailsRef} />
    </section>
    <div className={styles.backgroundImage}>
      <MapBox isLoggedIn={isLoggedIn} />
    </div>
    <section>
      <MapPage isLoggedIn={isLoggedIn} />
    </section>
  </div>
);

export default MobileLayout; 