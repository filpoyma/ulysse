import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectIsLoggedIn } from '../../store/selectors';
import { authService } from '../../services';
import AdminSignIn from '../AdminLogin/AdminSignIn.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AdminPanel.module.css';
import AdminNav from './components/AdminNav.tsx';
import { ProgramsSection } from './components/ProgramsSection';
import { HotelsCollectSection } from './components/HotelsCollectSection.tsx';
import { RestarauntsCollectSection } from './components/RestarauntsCollectSection';
import { Loader } from '../../components/Loader/Loader';
import { NavItem } from '../../types/adminPanel.types.ts';
import HotelsListSection from './components/HotelsListSection.tsx';
import { getErrorMessage } from '../../utils/helpers.ts';
import RestaurantsListSection from './components/RestaurantsListSection.tsx';

const AdminPanel: FC = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') as NavItem | null;
  const id = searchParams.get('id');

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('itineraries');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (tab) {
      setActiveNavItem(tab as NavItem);
    }
  }, [tab]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/ulyseadmin');
    } catch (err) {
      console.error('Logout error:', err);
      setError(getErrorMessage(err));
    }
  };

  if (isLoading) return <Loader />;

  if (!isLoggedIn) return <AdminSignIn />;

  return (
    <div className={styles.container}>
      <AdminNav
        activeNavItem={activeNavItem}
        onNavItemChange={setActiveNavItem}
        onLogout={handleLogout}
      />

      {error && <div className={styles.error}>{error}</div>}

      {activeNavItem === 'itineraries' && <ProgramsSection />}
      {activeNavItem === 'hotels-collections' && <HotelsCollectSection />}
      {activeNavItem === 'hotels-pages' && <HotelsListSection />}
      {activeNavItem === 'restaurants-collections' && <RestarauntsCollectSection id={id} />}
      {activeNavItem === 'restaurants-pages' && <RestaurantsListSection />}
    </div>
  );
};

export default AdminPanel;
