import { useState, useEffect } from 'react';
import { travelProgramService } from '../../../services/travelProgram.service';
import { ITravelProgramResponse } from '../../../types/travelProgram.types';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../utils/helpers.ts';
import { useSelector } from 'react-redux';
import { selectAdminEmail, selectTravelPrograms } from '../../../store/selectors.ts';
import useSortList from './useSort.ts';

export const usePrograms = () => {
  const navigate = useNavigate();

  const programs = useSelector(selectTravelPrograms);
  const currentManager = useSelector(selectAdminEmail) || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof ITravelProgramResponse>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Состояние для редактирования имени программы
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!programs?.length)
      (async () => {
        try {
          setLoading(true);
          setError(null);
          await travelProgramService.getAll();
        } catch (err) {
          setError('Ошибка при загрузке программ: ' + getErrorMessage(err));
          console.error('Error fetching programs:', err);
        } finally {
          setLoading(false);
        }
      })();
  }, []);

  const sortedPrograms = useSortList(programs, sortField, sortOrder, currentManager);

  const handleSortPrograms = (field: keyof ITravelProgramResponse) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleCreateTemplate = () => setIsModalOpen(true);

  const handleCreateTemplateSubmit = async (name: string) => {
    try {
      await travelProgramService.createTemplate(name);
      setIsModalOpen(false);
    } catch (err) {
      setError('Ошибка создания шаблона: ' + getErrorMessage(err));
      console.error('Error creating template:', err);
    }
  };

  const handleProgramCopy = async (id: string) => {
    try {
      await travelProgramService.copy(id);
    } catch (err) {
      setError('Ошибка копирования: ' + getErrorMessage(err));
      console.error('Error program copy:', err);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту программу?')) return;

    try {
      await travelProgramService.delete(id);
    } catch (err) {
      setError('Ошибка удаления программы: ' + getErrorMessage(err));
      console.error('Error deleting program:', err);
    }
  };

  const handleProgramClick = (name_eng: string) => {
    navigate(`/travel-programm/${name_eng}`);
  };

  // Методы для редактирования имени программы
  const handleEditClick = (program: ITravelProgramResponse) => {
    setEditingId(program._id);
    setEditingName(program.name);
  };

  const handleSave = async () => {
    if (!editingId || !editingName.trim()) return;
    
    setIsSaving(true);
    try {
      await travelProgramService.updateProgramName(editingId, editingName.trim());
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      console.error('Error updating program name:', error);
      setError('Ошибка обновления имени программы: ' + getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const onEditingNameChange = (name: string) => {
    setEditingName(name);
  };

  return {
    programs: sortedPrograms,
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
  };
};
