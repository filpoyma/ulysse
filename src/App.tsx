import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from './components/Header';
import { DetailsSection } from './components/DetailsSection';

function App() {
  const detailsRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [currentSection, setCurrentSection] = useState('hero');

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
      } else if (heroRect.top >= -100) {
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
      
      <div className="page-container">
        <div className="left-side">
          <div className={`background-image ${currentSection === 'hero' ? 'active' : ''}`}>
            <img src="https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Leopard in tree" />
          </div>
          <div className={`background-image ${currentSection === 'details' ? 'active' : ''}`}>
            <img src="https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Safari landscape" />
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

export default App;