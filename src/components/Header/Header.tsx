import React from 'react';
import { Share2, Sun, Menu } from 'lucide-react';
import { Logo } from '../../assets/icons/Logo.tsx';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

interface HeaderProps {
  currentSection: string;
  navRef: React.RefObject<HTMLElement>;
  scrollToDetails: () => void;
  scrollToMap: () => void;
  scrollToHero: () => void;
  scrollToDay: () => void;
  isLoggedIn: boolean;
}

const Header = ({
  currentSection,
  navRef,
  scrollToDetails,
  scrollToMap,
  scrollToHero,
  isLoggedIn,
  scrollToDay,
}: HeaderProps) => {
  const name_eng = useSelector((state: RootState) => state.travelProgram.program?.name_eng);
  return (
    <header className={styles.header}>
      <Link to={isLoggedIn ? '/admin' : `/travel-programm/${name_eng}`} className={styles.logo}>
        {isLoggedIn ? <span className={styles.adminText}>ADMIN</span> : <Logo />}
      </Link>
      <nav className={styles.nav} ref={navRef}>
        <a
          href="#hero"
          className={`${styles.navLink} ${currentSection === 'hero' ? styles.navLinkActive : ''}`}>
          Титульная страница
        </a>
        <a
          href="#details"
          className={`${styles.navLink} ${
            currentSection === 'details' ? styles.navLinkActive : ''
          }`}>
          Детали маршрута
        </a>
        <a
          href="#map"
          onClick={scrollToMap}
          className={`${styles.navLink} ${currentSection === 'map' ? styles.navLinkActive : ''}`}>
          Карта
        </a>
        <a
          href="#day1"
          className={`${styles.navLink} ${currentSection === 'day1' ? styles.navLinkActive : ''}`}>
          День 1
        </a>
        <a href="#day2" className={`${styles.navLink} ${currentSection === 'day2' ? styles.navLinkActive : ''}`} >
          День 2
        </a>
        <a href="#" className={styles.navLink}>
          День 3
        </a>
        <a href="#" className={styles.navLink}>
          День 4
        </a>
        <a href="#" className={styles.navLink}>
          День 5-6
        </a>
        <a href="#" className={styles.navLink}>
          День 7
        </a>
      </nav>
      <div className={styles.utilities}>
        <Share2 size={20} className={styles.utilityIcon} />
        <Sun size={20} className={styles.utilityIcon} />
        <Menu size={20} className={styles.utilityIcon} />
      </div>
    </header>
  );
};

export default Header;
