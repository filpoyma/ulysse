import { FC, useEffect } from 'react';
import { usePrograms } from '../hooks/usePrograms';
import { SectionHeader } from './SectionHeader';
import ProgramsTable from './ProgramsTable.tsx';
import CreateTemplateModal from '../../../components/CreateTemplateModal/CreateTemplateModal';
import { Loader } from '../../../components/Loader/Loader';
import styles from '../adminLayout.module.css';

const ProgramsSection: FC = () => {
  const {
    programs,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    sortField,
    sortOrder,
    handleSortPrograms,
    fetchPrograms,
    handleCreateTemplate,
    handleCreateTemplateSubmit,
    handleDeleteProgram,
    handleProgramClick,
    handleProgramEdit,
  } = usePrograms();

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <>
      <SectionHeader title="Список программ путешествий" onCreateClick={handleCreateTemplate} />
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <ProgramsTable
          programs={programs}
          onProgramClick={handleProgramClick}
          onProgramEdit={handleProgramEdit}
          onDeleteProgram={handleDeleteProgram}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortPrograms}
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

export default ProgramsSection;
