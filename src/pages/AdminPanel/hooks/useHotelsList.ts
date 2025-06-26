import { useState, useRef, useMemo } from 'react';
import { hotelsListService, IHotelsList, IHotelsListWithHotels, ICreateHotelsListData } from '../../../services/hotelsList.service';
import { useNavigate } from 'react-router-dom';

export const useHotelsList = () => {
  const navigate = useNavigate();

  const [hotelsLists, setHotelsLists] = useState<IHotelsList[]>([]);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newList, setNewList] = useState<ICreateHotelsListData>({
    name: '',
    description: '',
  });
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editingListData, setEditingListData] = useState<ICreateHotelsListData>({
    name: '',
    description: '',
  });
  const [sortField, setSortField] = useState<keyof IHotelsList>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const sortedHotelsLists = useMemo(() => {
    const arr = [...hotelsLists];
    arr.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [hotelsLists, sortField, sortOrder]);

  const fetchHotelsLists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hotelsListService.getAll();
      // Приводим к базовому типу IHotelsList
      const lists = (response.data as IHotelsList[]).map(list => ({
        ...list,
        hotels: Array.isArray(list.hotels) && typeof list.hotels[0] === 'string' 
          ? list.hotels 
          : (list.hotels as any[]).map((hotel: any) => hotel._id || hotel)
      }));
      setHotelsLists(lists);
    } catch (err: any) {
      setError('Ошибка при загрузке списков отелей');
      console.error('Error fetching hotels lists:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortLists = (field: keyof IHotelsList) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleListClick = (id: string) => {
    const list = hotelsLists.find((l: IHotelsList) => l._id === id);
    if (!list) return;
    setEditingListId(id);
    setEditingListData({
      name: list.name,
      description: list.description,
    });
  };

  const handleEditListChange = (field: keyof IHotelsList, value: string) => {
    setEditingListData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEditList = async () => {
    if (!editingListId) return;
    if (!editingListData.name) {
      setError('Заполните название списка');
      return;
    }
    try {
      setError(null);
      await hotelsListService.update(editingListId, editingListData);
      setEditingListId(null);
      setEditingListData({ name: '', description: '' });
      await fetchHotelsLists(); // Обновляем список
    } catch (err: any) {
      setError('Ошибка при редактировании списка');
      console.error('Error editing list:', err);
    }
  };

  const handleCancelEditList = () => {
    setEditingListId(null);
    setEditingListData({ name: '', description: '' });
  };

  const handleDeleteList = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот список отелей?')) return;
    try {
      setError(null);
      await hotelsListService.delete(id);
      await fetchHotelsLists(); // Обновляем список
    } catch (err: any) {
      setError('Ошибка удаления списка');
      console.error('Error deleting list:', err);
    }
  };

  const handleCreateListClick = () => {
    setIsCreatingList(true);
    setNewList({ name: '', description: '' });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNewListChange = (field: keyof IHotelsList, value: string) => {
    setNewList((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewList = async () => {
    if (!newList.name) {
      setError('Заполните название списка');
      return;
    }
    try {
      setError(null);
      await hotelsListService.create(newList);
      setIsCreatingList(false);
      setNewList({ name: '', description: '' });
      await fetchHotelsLists(); // Обновляем список
    } catch (err: any) {
      setError(`Ошибка при создании списка ${err?.message || 'Неизвестная ошибка'}`);
      console.error('Error creating list:', err?.message);
    }
  };

  const handleCancelNewList = () => {
    setIsCreatingList(false);
    setError(null);
    setNewList({ name: '', description: '' });
  };

  const handleNavigateToListPage = (id: string) => {
    navigate(`/hotels-list/${id}`);
  };

  return {
    hotelsLists: sortedHotelsLists,
    isCreatingList,
    newList,
    editingListId,
    editingListData,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortLists,
    handleListClick,
    handleEditListChange,
    handleSaveEditList,
    handleCancelEditList,
    handleDeleteList,
    handleCreateListClick,
    handleNewListChange,
    handleSaveNewList,
    handleCancelNewList,
    handleNavigateToListPage,
    fetchHotelsLists,
  };
}; 