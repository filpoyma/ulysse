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
  const [selectedImageNumber, setSelectedImageNumber] = useState<number | null>(0);

  const program = useSelector((state: RootState) => state.travelProgram.program);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const firstPage: FirstPageType = program?.firstPage || DEFAULT_FIRST_PAGE;

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
    if (!rightSide) return;

    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const detailsSection = document.getElementById('details');
      const mapSection = document.getElementById('map');
      const backgroundImages = document.querySelectorAll('.background-image');

      if (!heroSection || !detailsSection || !mapSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const detailsRect = detailsSection.getBoundingClientRect();
      const mapRect = mapSection.getBoundingClientRect();
      const headerHeight = 80;

      // Get scroll position and viewport height
      const scrollTop = rightSide.scrollTop;
      const viewportHeight = window.innerHeight - headerHeight;

      // Update image positions based on scroll
      backgroundImages.forEach((img, index) => {
        if (index === 0) {
          // First image moves with first section
          const translateY = -scrollTop;
          (img as HTMLElement).style.transform = `translateY(${translateY}px)`;
        } else if (index === 1) {
          // Second image follows first image with stacking effect
          const translateY = Math.min(0, -scrollTop + viewportHeight);
          (img as HTMLElement).style.transform = `translateY(${translateY}px)`;
        }
      });

      // Update active states for other functionality
      if (mapRect.top <= headerHeight + 100) {
        setCurrentSection('map');
        setSelectedImageNumber(2);
      } else if (detailsRect.top <= headerHeight + 100) {
        setCurrentSection('details');
        setSelectedImageNumber(1);
      } else if (heroRect.top >= -100) {
        setSelectedImageNumber(0);
        setCurrentSection('hero');
      }
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

  console.log('First page bg:', firstPageBg);
  console.log('Second page bg:', secondPageBg);

  return (
    <>
      <Header currentSection={currentSection} navRef={navRef} scrollToDetails={scrollToDetails} />
      <ImageUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programName={programName}
        imageNumber={selectedImageNumber}
      />
      <div className="page-container">
        <div className="left-side">
          <div className="background-image" style={{ zIndex: 2 }}>
            <img 
              src={firstPageBg} 
              alt="Leopard in tree" 
              onClick={() => setIsModalOpen(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="background-image" style={{ zIndex: 1 }}>
            <img 
              src={secondPageBg} 
              alt="Safari landscape" 
              onClick={() => setIsModalOpen(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
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
