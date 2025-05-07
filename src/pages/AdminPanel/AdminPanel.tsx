import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../store/selectors";
import { travelProgramService } from "../../services/travelProgram.service";
import { authService } from "../../services";
import AdminLogin from "../AdminLogin/AdminLogin";
import CreateTemplateModal from "../../components/CreateTemplateModal/CreateTemplateModal";
import { TravelProgram } from "../../types/travelProgram.types";
import { Plus } from "lucide-react";
import styles from "./AdminPanel.module.css";
import AdminNav from "./AdminNav";
import ProgramsTable from "./ProgramsTable";
import { useNavigate } from "react-router-dom";

type NavItem = 'itineraries' | 'hotels' | 'restaurants' | 'info' | 'references';

const AdminPanel = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [programs, setPrograms] = useState<TravelProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>('itineraries');

  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await travelProgramService.getAll();
      setPrograms(response.data || []);
    } catch (err) {
      setError("Ошибка при загрузке программ");
      console.error("Error fetching programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPrograms();
    }
  }, [isLoggedIn]);

  const handleCreateTemplate = () => setIsModalOpen(true);

  const handleCreateTemplateSubmit = async (name: string) => {
    try {
      await travelProgramService.createTemplate(name);
      setIsModalOpen(false);
      await fetchPrograms();
    } catch (err) {
      setError("Ошибка создания шаблона");
      console.error("Error creating template:", err);
    }
  };

  const handleProgramClick = async (name_eng: string) => {
    navigate(`/travel-programm/${name_eng}`);
  };

  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту программу?")) {
      return;
    }

    try {
      await travelProgramService.delete(id);
      await fetchPrograms();
    } catch (err) {
      setError("Ошибка удаления программы");
      console.error("Error deleting program:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/ulyseadmin');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Ошибка при выходе из системы');
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  return (
    <div className={styles.container}>
      <AdminNav 
        activeNavItem={activeNavItem}
        onNavItemChange={setActiveNavItem}
        onLogout={handleLogout}
      />

      <CreateTemplateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTemplateSubmit}
      />
      
      <div className={styles.header}>
        <h2>Список программ путешествий</h2>
        <button 
          className={styles.createButton}
          onClick={handleCreateTemplate}
        >
          <Plus size={20} />
          Создать программу
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <ProgramsTable 
          programs={programs}
          onProgramClick={handleProgramClick}
          onDeleteProgram={handleDeleteProgram}
        />
      )}
    </div>
  );
};

export default AdminPanel;

