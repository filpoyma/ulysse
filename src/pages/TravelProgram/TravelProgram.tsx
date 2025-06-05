import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import { DetailsSection } from '../../components/DetailsSection';
import ImageUploadModal from '../../components/ImageUploadModal/ImageUploadModal.tsx';
import FirstPage from '../../components/FirstPage/FirstPage.tsx';
import MapBox from '../../components/MapBox/MapBoxCustomLayer.component.tsx';
import MapPage from '../../components/MapPage/MapPage.tsx';
import { useSelector } from 'react-redux';
import { travelProgramService } from '../../services/travelProgram.service.ts';
import { ROOT_URL } from '../../constants/api.constants.ts';
import { IFirstPageData as FirstPageType } from '../../types/travelProgram.types.ts';
import { selectIsLoggedIn, selectTravelProgram } from '../../store/selectors.ts';
import styles from './TravelProgram.module.css';

const DEFAULT_FIRST_PAGE: FirstPageType = {
  title: '',
  subtitle: '',
  footer: '',
};

const TravelProgram: React.FC = () => {
  const { programName } = useParams();
  const detailsRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedImageNumberRef = useRef<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  const program = useSelector(selectTravelProgram);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const firstPage: FirstPageType = program?.firstPage || DEFAULT_FIRST_PAGE;

  useEffect(() => {
    if (programName) {
      travelProgramService.getByName(programName).catch(console.error);
    }
  }, [programName]);

  const scrollToHero = useCallback(() => {
    setCurrentSection('hero');
  }, []);

  const scrollToDetails = useCallback(() => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection('details');
  }, []);

  const scrollToMap = useCallback(() => {
    setCurrentSection('map');
  }, []);

  useEffect(() => {
    const rightSide = document.querySelector(`.${styles.rightSide}`);
    const leftSide = document.querySelector(`.${styles.leftSide}`);
    if (!rightSide || !leftSide) return;

    const resetImageTransforms = () => {
      const backgroundImages = document.querySelectorAll(`.${styles.backgroundImage}`);
      backgroundImages.forEach(img => {
        (img as HTMLElement).style.transform = '';
      });
    };

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) return;
      const detailsSection = document.getElementById('details');
      const backgroundImages = document.querySelectorAll(`.${styles.backgroundImage}`);
      const mapSection = document.getElementById('map');
      console.log('file-TravelProgram.tsx detailsSection:', detailsSection);
      if (!detailsSection) return;

      const headerHeight = 80;
      const scrollTop = isMobile ? window.scrollY : rightSide.scrollTop;
      const leftSideHeight = (leftSide as HTMLElement).offsetHeight;

      const detailsSectionStart = detailsSection.offsetTop - leftSideHeight;
      const detailsScrolled = scrollTop + headerHeight - detailsSectionStart;

      const mapSectionStart = (mapSection as HTMLElement).offsetTop - leftSideHeight;
      const mapScrolled = scrollTop + headerHeight - mapSectionStart;

      if (mapScrolled > 0) selectedImageNumberRef.current = null;
      else if (detailsScrolled > 0) selectedImageNumberRef.current = 1;
      else selectedImageNumberRef.current = 0;

      if (!isMobile) {
        const firstImage = backgroundImages[0];
        const secondImage = backgroundImages[1];
        const thirdImage = backgroundImages[2];

        if (firstImage) {
          (firstImage as HTMLElement).style.transform = `translateY(0)`;
        }

        if (secondImage) {
          let translateY = leftSideHeight;
          if (detailsScrolled > 0) {
            translateY = Math.max(0, leftSideHeight - detailsScrolled);
          }
          (secondImage as HTMLElement).style.transform = `translateY(${translateY}px)`;
        }

        if (thirdImage) {
          let translateY = leftSideHeight;
          if (mapScrolled > 0) {
            translateY = Math.max(0, leftSideHeight - mapScrolled);
          }
          (thirdImage as HTMLElement).style.transform = `translateY(${translateY}px)`;
        }
      }
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      // Сбрасываем трансформации при изменении размера окна
      resetImageTransforms();

      if (isMobile) {
        window.addEventListener('scroll', handleScroll);
        rightSide.removeEventListener('scroll', handleScroll);
      } else {
        rightSide.addEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScroll);
      }

      // Даем время на перерисовку DOM перед применением новых трансформаций
      setTimeout(handleScroll, 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      rightSide.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const firstPageBg = program?.bgImages?.[0]?.path
    ? `${ROOT_URL}/${program.bgImages[0].path.replace(/^\//, '')}`
    : 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920';

  const secondPageBg = program?.bgImages?.[1]?.path
    ? `${ROOT_URL}/${program.bgImages[1].path.replace(/^\//, '')}`
    : 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1920';

  return (
    <>
      <Header
        currentSection={currentSection}
        navRef={navRef}
        scrollToDetails={scrollToDetails}
        scrollToMap={scrollToMap}
        scrollToHero={scrollToHero}
        isLoggedIn={isLoggedIn}
      />
      <ImageUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programName={programName}
        imageNumber={selectedImageNumberRef.current}
        isLoggedIn={isLoggedIn}
      />
      {isMobile ? (
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
              onScrollToDetails={scrollToDetails}
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
      ) : (
        <div className={styles.pageContainer}>
          <div className={styles.leftSide}>
            <div className={styles.backgroundImage}>
              <img
                src={firstPageBg}
                alt="First page background"
                onClick={() => setIsModalOpen(true)}
                className={styles.leftSideBgImage}
              />
            </div>
            <div className={styles.backgroundImage}>
              <img
                src={secondPageBg}
                alt="Second page background"
                onClick={() => setIsModalOpen(true)}
                className={styles.leftSideBgImage}
              />
            </div>
            <div className={styles.backgroundImage}>
              <MapBox isLoggedIn={isLoggedIn} />
            </div>
          </div>
          <div className={styles.rightSide}>
            <FirstPage
              firstPage={firstPage}
              programName={programName}
              isLoggedIn={isLoggedIn}
              onScrollToDetails={scrollToDetails}
            />
            <DetailsSection ref={detailsRef} />
            <MapPage isLoggedIn={isLoggedIn} />
          </div>
        </div>
      )}
    </>
  );
};

export default TravelProgram;
