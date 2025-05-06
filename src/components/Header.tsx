import React from 'react';
import { Share2, Sun, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentSection: string;
  navRef: React.RefObject<HTMLElement>;
  scrollToDetails: () => void;
}

const Header = ({ currentSection, navRef, scrollToDetails }: HeaderProps) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <nav className="nav" ref={navRef}>
        <a href="#hero" className={`nav-link ${currentSection === 'hero' ? 'active' : ''}`}>Титульная страница</a>
        <a href="#details" onClick={scrollToDetails} className={`nav-link ${currentSection === 'details' ? 'active' : ''}`}>Детали маршрута</a>
        <a href="#" className="nav-link">Карта</a>
        <a href="#" className="nav-link">День 1</a>
        <a href="#" className="nav-link">День 2</a>
        <a href="#" className="nav-link">День 3</a>
        <a href="#" className="nav-link">День 4</a>
        <a href="#" className="nav-link">День 5-6</a>
        <a href="#" className="nav-link">День 7</a>
      </nav>
      <div className="utilities">
        <Share2 size={20} className="utility-icon" />
        <Sun size={20} className="utility-icon" />
        <Menu size={20} className="utility-icon" />
      </div>
    </header>
  );
}

export default Header;