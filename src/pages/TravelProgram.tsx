import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { DetailsSection } from '../components/DetailsSection';
import ImageUploadModal from '../components/ImageUploadModal/ImageUploadModal';

import { useSelector, useDispatch } from 'react-redux';
import { travelProgramService } from '../services/travelProgram.service';
import { travelProgramActions } from '../store/reducers/travelProgram';
import { RootState } from '../store';
import { ROOT_URL } from '../constants/api.constants';

const TravelProgram = () => {
  const { programName } = useParams();
  const detailsRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageNumber, setSelectedImageNumber] = useState<number | null>(null);

  const dispatch = useDispatch();
  const program = useSelector((state: RootState) => state.travelProgram.program);
  const leftBg = program?.bgImages?.[0]?.path
    ? `${ROOT_URL}/${program.bgImages[0].path.replace(/^\//, '')}`
    : "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920";
  const rightBg = program?.bgImages?.[1]?.path
    ? `${ROOT_URL}/${program.bgImages[1].path.replace(/^\//, '')}`
    : "https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1920";

  useEffect(() => {
    if (programName) {
      travelProgramService.getByName(programName)
        .then(res => {
          if (res && res.data) {
            dispatch(travelProgramActions.setProgram(res.data));
          }
        });
    }
  }, [programName, dispatch]);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection('details');
  };

  useEffect(() => {
    const rightSide = document.querySelector('.right-side');
    if (!rightSide) return;

    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const detailsSection = document.getElementById('details');
      
      if (!heroSection || !detailsSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const detailsRect = detailsSection.getBoundingClientRect();
      
      // Account for header height
      const headerHeight = 80;
      
      if (detailsRect.top <= headerHeight + 100) {
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

  return (
    <>
      <Header 
        currentSection={currentSection}
        navRef={navRef}
        scrollToDetails={scrollToDetails}
      />
      <ImageUploadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} programName={programName} imageNumber={selectedImageNumber} />
      <div className="page-container">
        <div className="left-side" style={{ cursor: 'pointer' }}>
          <div className={`background-image ${currentSection === 'hero' ? 'active' : ''}`}>
            <img src={leftBg} alt="Leopard in tree" onClick={() => { setIsModalOpen(true); }} />
          </div>
          <div className={`background-image ${currentSection === 'details' ? 'active' : ''}`}>
            <img src={rightBg} alt="Safari landscape" onClick={() => { setIsModalOpen(true); }} />
          </div>
        </div>
        <div className="right-side">
          <section id="hero" className="content-section">
            <div className="content-wrapper hero-content">
              <div className="hero-text">
                <p className="hero-subtitle">ПУТЕШЕСТВИЕ:</p>
                <h1 className="hero-title">КЕНИЯ С ДЕТЬМИ</h1>
              </div>
            </div>
            <div className="scroll-container">
              <p className="cta-text">ХОЧЕШЬ ЧУДЕС? ЧУДИ С НАМИ</p>
              <button onClick={scrollToDetails} className="scroll-button">
                <ChevronDown className="arrow-down" size={32} />
              </button>
            </div>
          </section>
          <DetailsSection ref={detailsRef} />
        </div>
      </div>
    </>
  );
}

export default TravelProgram;