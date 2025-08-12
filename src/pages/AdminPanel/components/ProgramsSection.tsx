import { usePrograms } from '../hooks/usePrograms';
import { SectionHeader } from './SectionHeader';
import ProgramsTable from './ProgramsTable.tsx';
import CreateTemplateModal from '../../../components/CreateTemplateModal/CreateTemplateModal';
import { Loader } from '../../../components/Loader/Loader';
import styles from '../adminLayout.module.css';

const ProgramsSection = () => {
  const {
    programs,
    currentManager,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    sortField,
    sortOrder,
    handleSortPrograms,
    handleCreateTemplate,
    handleCreateTemplateSubmit,
    handleDeleteProgram,
    handleProgramClick,
    handleProgramCopy,
    // Состояние и методы для редактирования
    editingId,
    editingName,
    isSaving,
    handleEditClick,
    handleSave,
    handleCancel,
    handleKeyPress,
    onEditingNameChange,
  } = usePrograms();

  if (loading) return <Loader />;

  return (
    <>
      <SectionHeader title="Список программ путешествий" onCreateClick={handleCreateTemplate} />
      {error && <div className={styles.error}>{error}</div>}
      <ProgramsTable
        programs={programs}
        currentManager={currentManager}
        onProgramClick={handleProgramClick}
        onProgramCopy={handleProgramCopy}
        onDeleteProgram={handleDeleteProgram}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSortPrograms}
        // Состояние и методы для редактирования
        editingId={editingId}
        editingName={editingName}
        isSaving={isSaving}
        onEditClick={handleEditClick}
        onSave={handleSave}
        onCancel={handleCancel}
        onKeyPress={handleKeyPress}
        onEditingNameChange={onEditingNameChange}
      />

      <CreateTemplateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTemplateSubmit}
      />
    </>
  );
};

export default ProgramsSection;
