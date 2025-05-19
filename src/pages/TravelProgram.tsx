import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { DetailsSection } from '../components/DetailsSection';
import ImageUploadModal from '../components/ImageUploadModal/ImageUploadModal';
import FirstPage from '../components/FirstPage';
import MapBox from '../components/MapBox/MapBoxCustomLayer.component';
import MapPage from '../components/MapPage/MapPage';
import { useSelector } from 'react-redux';
import { travelProgramService } from '../services/travelProgram.service';
import { RootState } from '../store';
import { ROOT_URL } from '../constants/api.constants';
import { IFirstPageData as FirstPageType } from '../types/travelProgram.types';

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

  const program = useSelector((state: RootState) => state.travelProgram.program);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const firstPage: FirstPageType = program?.firstPage || DEFAULT_FIRST_PAGE;
  console.log('RENDER');
  useEffect(() => {
    if (programName) {
      travelProgramService.getByName(programName).catch(console.error);
    }
  }, [programName]);

  const handleUpdateFirstPage = useCallback(
    async (values: FirstPageType) => {
      if (!programName) return;
      await travelProgramService.updateFirstPage(programName, values);
    },
    [programName],
  );

  const scrollToDetails = useCallback(() => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection('details');
  }, []);

  useEffect(() => {
    const rightSide = document.querySelector('.right-side');
    const leftSide = document.querySelector('.left-side');
    if (!rightSide || !leftSide) return;

    const handleScroll = () => {
      const detailsSection = document.getElementById('details');
      const backgroundImages = document.querySelectorAll('.background-image');
      const mapSection = document.getElementById('map');

      if (!detailsSection) return;

      const headerHeight = 80;
      const scrollTop = rightSide.scrollTop;
      const leftSideHeight = (leftSide as HTMLElement).offsetHeight;

      const detailsSectionStart = detailsSection.offsetTop - leftSideHeight;
      const scrolled = scrollTop + headerHeight - detailsSectionStart;

      const mapSectionStart = (mapSection as HTMLElement).offsetTop - leftSideHeight;
      const mapScrolled = scrollTop + headerHeight - mapSectionStart;

      if (mapScrolled > 0) {
        console.log('n');
        selectedImageNumberRef.current = null;
      } else if (scrolled > 0) {
        console.log('1');
        selectedImageNumberRef.current = 1;
      } else {
        console.log('0');
        selectedImageNumberRef.current = 0;
      }

      backgroundImages.forEach((img, index) => {
        if (index === 0) {
          (img as HTMLElement).style.transform = `translateY(0)`;
        } else if (index === 1) {
          let translateY = leftSideHeight;
          if (scrolled > 0) {
            translateY = Math.max(0, leftSideHeight - scrolled);
          }
          (img as HTMLElement).style.transform = `translateY(${translateY}px)`;
        } else if (index === 2) {
          // MapBox: аналогичная логика для третьей картинки
          let translateY = leftSideHeight;
          if (mapScrolled > 0) {
            translateY = Math.max(0, leftSideHeight - mapScrolled);
          }
          (img as HTMLElement).style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    rightSide.addEventListener('scroll', handleScroll);
    return () => rightSide.removeEventListener('scroll', handleScroll);
  }, []);

  const firstPageBg = program?.bgImages?.[0]?.path
    ? `${ROOT_URL}/${program.bgImages[0].path.replace(/^\//, '')}`
    : 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920';

  const secondPageBg = program?.bgImages?.[1]?.path
    ? `${ROOT_URL}/${program.bgImages[1].path.replace(/^\//, '')}`
    : 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1920';

  return (
    <>
      <Header currentSection={currentSection} navRef={navRef} scrollToDetails={scrollToDetails} />
      <ImageUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programName={programName}
        imageNumber={selectedImageNumberRef.current}
      />
      <div className="page-container">
        <div className="left-side">
          <div className="background-image" style={{ zIndex: 1 }}>
            <img
              src={firstPageBg}
              alt="Leopard in tree"
              onClick={() => setIsModalOpen(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="background-image" style={{ zIndex: 2 }}>
            <img
              src={secondPageBg}
              alt="Safari landscape"
              onClick={() => setIsModalOpen(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="background-image" style={{ zIndex: 3 }}>
            <MapBox />
          </div>
        </div>
        <div className="right-side">
          <FirstPage
            firstPage={firstPage}
            isLoggedIn={isLoggedIn}
            onUpdate={handleUpdateFirstPage}
            onScrollToDetails={scrollToDetails}
          />
          <DetailsSection ref={detailsRef} />
          <div id="map">
            <MapPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelProgram;
