import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading, selectIsLoggedIn } from "../../store/selectors";
import { authService } from "../../services";
import AdminSignIn from "../AdminLogin/AdminSignIn.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";
import AdminNav from "./components/AdminNav.tsx";
import { ProgramsSection } from "./components/ProgramsSection";
import { HotelsCollectSection } from "./components/HotelsCollectSection.tsx";
import { RestarauntsCollectSection } from "./components/RestarauntsCollectSection";
import { Loader } from "../../components/Loader/Loader";

type NavItem =
  | "itineraries"
  | "hotels"
  | "hotels-collections"
  | "hotels-pages"
  | "restaurants"
  | "restaurants-collections"
  | "restaurants-pages"
  | "info"
  | "references";

const AdminPanel: FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>("itineraries");
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);


  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/ulyseadmin");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Ошибка при выходе из системы");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <AdminSignIn />;
  }

  return (
    <div className={styles.container}>
      <AdminNav
        activeNavItem={activeNavItem}
        onNavItemChange={setActiveNavItem}
        onLogout={handleLogout}
      />

      {error && <div className={styles.error}>{error}</div>}

      {activeNavItem === "itineraries" && <ProgramsSection />}
      {activeNavItem === "hotels-collections" && <HotelsCollectSection />}
      {activeNavItem === "restaurants-collections" && <RestarauntsCollectSection />}
    </div>
  );
};

export default AdminPanel;
