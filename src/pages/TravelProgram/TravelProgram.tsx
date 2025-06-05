import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import ImageUploadModal from '../../components/ImageUploadModal/ImageUploadModal.tsx';
import { useSelector } from 'react-redux';
import { travelProgramService } from '../../services/travelProgram.service.ts';
import { ROOT_URL } from '../../constants/api.constants.ts';
import { IFirstPageData as FirstPageType } from '../../types/travelProgram.types.ts';
import { selectIsLoggedIn, selectTravelProgram } from '../../store/selectors.ts';
import useIsMobile from '../../hooks/useIsMobile.tsx';
import styles from './TravelProgram.module.css';
import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';

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
  const isMobile = useIsMobile();

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

  const scrollToDay = useCallback(() => {
    const daySection = document.getElementById('day');
    if (daySection) {
      if (isMobile) {
        daySection.scrollIntoView({ behavior: 'smooth' });
      } else {
        const rightSide = document.querySelector(`.${styles.rightSide}`);
        if (rightSide) {
          rightSide.scrollTo({
            top: daySection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    }
    setCurrentSection('day');
  }, [isMobile]);

  const handleScroll = useCallback(() => {
    const rightSide = document.querySelector(`.${styles.rightSide}`);
    const leftSide = document.querySelector(`.${styles.leftSide}`);
    if (!rightSide || !leftSide || isMobile) return;
    
    const detailsSection = document.getElementById('details');
    const backgroundImages = document.querySelectorAll(`.${styles.backgroundImage}`);
    const mapSection = document.getElementById('map');
    const daySection = document.getElementById('day');

    if (!detailsSection) return;

    const headerHeight = 80;
    const scrollTop = rightSide.scrollTop;
    const leftSideHeight = (leftSide as HTMLElement).offsetHeight;

    const detailsSectionStart = detailsSection.offsetTop - leftSideHeight;
    const detailsScrolled = scrollTop + headerHeight - detailsSectionStart;

    const mapSectionStart = (mapSection as HTMLElement).offsetTop - leftSideHeight;
    const mapScrolled = scrollTop + headerHeight - mapSectionStart;

    const daySectionStart = (daySection as HTMLElement).offsetTop - leftSideHeight;
    const dayScrolled = scrollTop + headerHeight - daySectionStart;

    if (dayScrolled > 0) {
      selectedImageNumberRef.current = 3;
      setCurrentSection('day');
    } else if (mapScrolled > 0) {
      selectedImageNumberRef.current = 2;
      setCurrentSection('map');
    } else if (detailsScrolled > 0) {
      selectedImageNumberRef.current = 1;
      setCurrentSection('details');
    } else {
      selectedImageNumberRef.current = 0;
      setCurrentSection('hero');
    }

    const firstImage = backgroundImages[0];
    const secondImage = backgroundImages[1];
    const thirdImage = backgroundImages[2];
    const fourthImage = backgroundImages[3];

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

    if (fourthImage) {
      let translateY = leftSideHeight;
      if (dayScrolled > 0) {
        translateY = Math.max(0, leftSideHeight - dayScrolled);
      }
      (fourthImage as HTMLElement).style.transform = `translateY(${translateY}px)`;
    }
  }, [isMobile]);

  const handleWindowScroll = useCallback(() => {
    if (!isMobile) return;
    
    const detailsSection = document.getElementById('details');
    const mapSection = document.getElementById('map');
    const daySection = document.getElementById('day');
    const leftSide = document.querySelector(`.${styles.leftSide}`);

    if (!detailsSection || !leftSide) return;

    const headerHeight = 80;
    const scrollTop = window.scrollY;
    const leftSideHeight = (leftSide as HTMLElement).offsetHeight;

    const detailsSectionStart = detailsSection.offsetTop - leftSideHeight;
    const detailsScrolled = scrollTop + headerHeight - detailsSectionStart;

    const mapSectionStart = (mapSection as HTMLElement).offsetTop - leftSideHeight;
    const mapScrolled = scrollTop + headerHeight - mapSectionStart;

    const daySectionStart = (daySection as HTMLElement).offsetTop - leftSideHeight;
    const dayScrolled = scrollTop + headerHeight - daySectionStart;

    if (dayScrolled > 0) {
      selectedImageNumberRef.current = 3;
      setCurrentSection('day');
    } else if (mapScrolled > 0) {
      selectedImageNumberRef.current = 2;
      setCurrentSection('map');
    } else if (detailsScrolled > 0) {
      selectedImageNumberRef.current = 1;
      setCurrentSection('details');
    } else {
      selectedImageNumberRef.current = 0;
      setCurrentSection('hero');
    }
  }, [isMobile]);

  const handleResize = useCallback(() => {
    const rightSide = document.querySelector(`.${styles.rightSide}`);
    if (!rightSide) return;

    if (isMobile) {
      window.addEventListener('scroll', handleWindowScroll);
    } else {
      rightSide.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
    }
  }, [isMobile, handleScroll, handleWindowScroll]);

  useEffect(() => {
    const rightSide = document.querySelector(`.${styles.rightSide}`);
    if (!rightSide) return;

    // Удаляем все обработчики
    window.removeEventListener('scroll', handleWindowScroll);
    rightSide.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);

    // Добавляем нужные обработчики
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      rightSide.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, handleScroll, handleWindowScroll]);

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
        scrollToDay={scrollToDay}
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
        <MobileLayout
          firstPageBg={firstPageBg}
          secondPageBg={secondPageBg}
          firstPage={firstPage}
          programName={programName}
          isLoggedIn={isLoggedIn}
          onScrollToDetails={scrollToDetails}
          onScrollToDay={scrollToDay}
          setIsModalOpen={setIsModalOpen}
          detailsRef={detailsRef}
        />
      ) : (
        <DesktopLayout
          firstPageBg={firstPageBg}
          secondPageBg={secondPageBg}
          firstPage={firstPage}
          programName={programName}
          isLoggedIn={isLoggedIn}
          onScrollToDetails={scrollToDetails}
          onScrollToDay={scrollToDay}
          setIsModalOpen={setIsModalOpen}
          detailsRef={detailsRef}
        />
      )}
    </>
  );
};

export default TravelProgram;
