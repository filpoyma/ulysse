import { FC, useState } from "react";
import styles from "../AdminPanel.module.css";
import IconExit from "../../../assets/icons/exit.svg";

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

interface AdminNavProps {
  activeNavItem: NavItem;
  onNavItemChange: (item: NavItem) => void;
  onLogout: () => void;
}

const AdminNav: FC<AdminNavProps> = ({
  activeNavItem,
  onNavItemChange,
  onLogout,
}) => {
  const [isHotelsMenuOpen, setIsHotelsMenuOpen] = useState(false);
  const [isRestaurantsMenuOpen, setIsRestaurantsMenuOpen] = useState(false);

  const handleHotelsClick = () => {
    setIsHotelsMenuOpen(!isHotelsMenuOpen);
    setIsRestaurantsMenuOpen(false);
  };

  const handleRestaurantsClick = () => {
    setIsRestaurantsMenuOpen(!isRestaurantsMenuOpen);
    setIsHotelsMenuOpen(false);
  };

  const handleHotelsItemClick = (item: NavItem) => {
    onNavItemChange(item);
    setIsHotelsMenuOpen(false);
  };

  const handleRestaurantsItemClick = (item: NavItem) => {
    onNavItemChange(item);
    setIsRestaurantsMenuOpen(false);
  };

  const handleOtherNavItemClick = (item: NavItem) => {
    onNavItemChange(item);
    setIsHotelsMenuOpen(false);
    setIsRestaurantsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.navItem} ${
          activeNavItem === "itineraries" ? styles.active : ""
        }`}
        onClick={() => handleOtherNavItemClick("itineraries")}
      >
        Itineraries
      </button>
      <div className={styles.dropdownContainer}>
        <button
          className={`${styles.navItem} ${
            activeNavItem.startsWith("hotels") ? styles.active : ""
          }`}
          onClick={handleHotelsClick}
        >
          Hotels
        </button>
        <div
          className={`${styles.dropdownMenu} ${
            isHotelsMenuOpen ? styles.dropdownMenuVisible : ""
          }`}
        >
          <button
            className={`${styles.dropdownItem} ${
              activeNavItem === "hotels-collections" ? styles.active : ""
            }`}
            onClick={() => handleHotelsItemClick("hotels-collections")}
          >
            Hotels Collections
          </button>
          <button
            className={`${styles.dropdownItem} ${
              activeNavItem === "hotels-pages" ? styles.active : ""
            }`}
            onClick={() => handleHotelsItemClick("hotels-pages")}
          >
            Hotels Pages
          </button>
        </div>
      </div>
      <div className={styles.dropdownContainer}>
        <button
          className={`${styles.navItem} ${
            activeNavItem.startsWith("restaurants") ? styles.active : ""
          }`}
          onClick={handleRestaurantsClick}
        >
          Restaurants
        </button>
        <div
          className={`${styles.dropdownMenu} ${
            isRestaurantsMenuOpen ? styles.dropdownMenuVisible : ""
          }`}
        >
          <button
            className={`${styles.dropdownItem} ${
              activeNavItem === "restaurants-collections" ? styles.active : ""
            }`}
            onClick={() =>
              handleRestaurantsItemClick("restaurants-collections")
            }
          >
            Rest Collections
          </button>
          <button
            className={`${styles.dropdownItem} ${
              activeNavItem === "restaurants-pages" ? styles.active : ""
            }`}
            onClick={() => handleRestaurantsItemClick("restaurants-pages")}
          >
            Rest Pages
          </button>
        </div>
      </div>
      <button
        className={`${styles.navItem} ${
          activeNavItem === "info" ? styles.active : ""
        }`}
        onClick={() => handleOtherNavItemClick("info")}
      >
        Info
      </button>
      <button
        className={`${styles.navItem} ${
          activeNavItem === "references" ? styles.active : ""
        }`}
        onClick={() => handleOtherNavItemClick("references")}
      >
        References
      </button>
      <button className={styles.logoutButton} onClick={onLogout} title="Выйти">
        <IconExit width={24} height={24} />
      </button>
    </nav>
  );
};

export default AdminNav;
