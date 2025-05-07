import { FC } from 'react';
import styles from './AdminPanel.module.css';

type NavItem = 'itineraries' | 'hotels' | 'restaurants' | 'info' | 'references';

interface AdminNavProps {
  activeNavItem: NavItem;
  onNavItemChange: (item: NavItem) => void;
  onLogout: () => void;
}

const AdminNav: FC<AdminNavProps> = ({ activeNavItem, onNavItemChange, onLogout }) => {
  return (
    <nav className={styles.nav}>
      <button 
        className={`${styles.navItem} ${activeNavItem === 'itineraries' ? styles.active : ''}`}
        onClick={() => onNavItemChange('itineraries')}
      >
        Itineraries
      </button>
      <button 
        className={`${styles.navItem} ${activeNavItem === 'hotels' ? styles.active : ''}`}
        onClick={() => onNavItemChange('hotels')}
      >
        Hotels
      </button>
      <button 
        className={`${styles.navItem} ${activeNavItem === 'restaurants' ? styles.active : ''}`}
        onClick={() => onNavItemChange('restaurants')}
      >
        Restaurants
      </button>
      <button 
        className={`${styles.navItem} ${activeNavItem === 'info' ? styles.active : ''}`}
        onClick={() => onNavItemChange('info')}
      >
        Info
      </button>
      <button 
        className={`${styles.navItem} ${activeNavItem === 'references' ? styles.active : ''}`}
        onClick={() => onNavItemChange('references')}
      >
        References
      </button>
      <button 
        className={styles.logoutButton}
        onClick={onLogout}
        title="Выйти"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </nav>
  );
};

export default AdminNav; 