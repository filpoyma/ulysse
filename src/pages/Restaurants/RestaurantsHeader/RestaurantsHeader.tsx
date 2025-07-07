import { memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Share2, Sun, Menu } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { Logo } from '../../../assets/icons/Logo.tsx';
import styles from './styles.module.css';
import {
  selectIsLoggedIn,
  selectRestListId,
  selectRestListName,
} from '../../../store/selectors.ts';
import { selectRestaurantsNames } from '../../../store/reSelect.ts';

interface HeaderProps {
  currentSection: string;
}

const RestaurantsHeader = ({ currentSection }: HeaderProps) => {
  const headerNavRef = useRef<HTMLElement>(null);
  const listName = useSelector(selectRestListName);
  const listId = useSelector(selectRestListId);
  const restNames = useSelector(selectRestaurantsNames);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const scrollMenuToCenter = useDebouncedCallback(() => {
    const activeElement = headerNavRef.current?.querySelector(`.${styles.navLinkActive}`);
    if (activeElement) {
      (activeElement as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, 300);

  scrollMenuToCenter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className={styles.header}>
      <Link
        to={isLoggedIn ? `/admin/restaurants/list/edit/${listId}` : `/restaurants/${listName}`}
        className={styles.logo}>
        {isLoggedIn ? <span className={styles.adminText}>EDIT</span> : <Logo />}
      </Link>
      <nav className={styles.nav} ref={headerNavRef}>
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className={`${styles.navLink} ${currentSection === 'hero' ? styles.navLinkActive : ''}`}>
          {listName}
        </a>
        <a
          href="#map"
          onClick={(e) => handleNavClick(e, 'map')}
          className={`${styles.navLink} ${currentSection === 'map' ? styles.navLinkActive : ''}`}>
          Карта
        </a>
        {restNames.map((name, index) => (
          <a
            key={name.id}
            href={`#${name.id}`}
            onClick={(e) => handleNavClick(e, name.id)}
            className={`${styles.navLink} ${
              currentSection === `name${index}` ? styles.navLinkActive : ''
            }`}>
            {name.name}
          </a>
        ))}
      </nav>
      <div className={styles.utilities}>
        <Share2 size={20} className={styles.utilityIcon} />
        <Sun size={20} className={styles.utilityIcon} />
        <Menu size={20} className={styles.utilityIcon} />
      </div>
    </header>
  );
};

export default memo(RestaurantsHeader);
