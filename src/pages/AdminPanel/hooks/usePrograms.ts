import { useState, useMemo } from 'react';
import { travelProgramService } from '../../../services/travelProgram.service';
import { ITravelProgramResponse } from '../../../types/travelProgram.types';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../utils/helpers.ts';

export const usePrograms = () => {
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<ITravelProgramResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof ITravelProgramResponse>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedPrograms = useMemo(() => {
    const arr = [...programs];
    arr.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [programs, sortField, sortOrder]);

  const handleSortPrograms = (field: keyof ITravelProgramResponse) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await travelProgramService.getAll();
      setPrograms(response.data || []);
    } catch (err) {
      setError('Ошибка при загрузке программ: ' + getErrorMessage(err));
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = () => setIsModalOpen(true);

  const handleCreateTemplateSubmit = async (name: string) => {
    try {
      await travelProgramService.createTemplate(name);
      setIsModalOpen(false);
      await fetchPrograms();
    } catch (err) {
      setError('Ошибка создания шаблона: ' + getErrorMessage(err));
      console.error('Error creating template:', err);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту программу?')) {
      return;
    }

    try {
      await travelProgramService.delete(id);
      await fetchPrograms();
    } catch (err) {
      setError('Ошибка удаления программы: ' + getErrorMessage(err));
      console.error('Error deleting program:', err);
    }
  };

  const handleProgramClick = (name_eng: string) => {
    navigate(`/travel-programm/${name_eng}`);
  };
  const handleProgramEdit = (id: string) => {
    //navigate(`/travel-programm/${id}`);
  };

  return {
    programs: sortedPrograms,
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
  };
};
