import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePrograms } from "../hooks/usePrograms";
import { SectionHeader } from "./SectionHeader";
import ProgramsTable from "./ProgramsTable.tsx";
import CreateTemplateModal from "../../../components/CreateTemplateModal/CreateTemplateModal";
import { Loader } from "../../../components/Loader/Loader";
import styles from "../AdminPanel.module.css";

export const ProgramsSection: FC = () => {
  const navigate = useNavigate();
  const {
    programs,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    fetchPrograms,
    handleCreateTemplate,
    handleCreateTemplateSubmit,
    handleDeleteProgram,
  } = usePrograms();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleProgramClick = async (name_eng: string) => {
    navigate(`/travel-programm/${name_eng}`);
  };

  return (
    <>
      <SectionHeader
        title="Список программ путешествий"
        onCreateClick={handleCreateTemplate}
      />
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <ProgramsTable
          programs={programs}
          onProgramClick={handleProgramClick}
          onDeleteProgram={handleDeleteProgram}
        />
      )}
      <CreateTemplateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTemplateSubmit}
      />
    </>
  );
};
