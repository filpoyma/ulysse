import { useState } from 'react';
import { travelProgramService } from '../../../services/travelProgram.service';
import { TravelProgram, TravelProgramResponse } from '../../../types/travelProgram.types';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<TravelProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await travelProgramService.getAll() as TravelProgramResponse;
      setPrograms(response.data || []);
    } catch (err) {
      setError("Ошибка при загрузке программ");
      console.error("Error fetching programs:", err);
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
      setError("Ошибка создания шаблона");
      console.error("Error creating template:", err);
    }
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

  return {
    programs,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    fetchPrograms,
    handleCreateTemplate,
    handleCreateTemplateSubmit,
    handleDeleteProgram,
  };
}; 