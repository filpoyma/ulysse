import { useState, useRef, useEffect } from 'react';
import { restaurantsListService } from '../../../services/restaurantsList.service';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../utils/helpers.ts';
import { ICreateRestaurantsListData, IRestaurantsList } from '../../../types/restaurantsList.types';
import { useSelector } from 'react-redux';
import { selectAdminEmail, selectRestaurantsList } from '../../../store/selectors.ts';
import useSortList from './useSort.ts';

export const useRestaurantsList = () => {
  const navigate = useNavigate();

  const restaurantsLists = useSelector(selectRestaurantsList);
  const currentManager = useSelector(selectAdminEmail) || '';
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newList, setNewList] = useState<ICreateRestaurantsListData>({
    name: '',
    description: '',
  });
  const [sortField, setSortField] = useState<keyof IRestaurantsList>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!restaurantsLists.length) fetchRestaurantsLists();
  }, []);

  const sortedRestaurantsLists = useSortList(
    restaurantsLists,
    sortField,
    sortOrder,
    currentManager,
  );

  const fetchRestaurantsLists = async () => {
    try {
      setLoading(true);
      setError(null);
      await restaurantsListService.getAll();
    } catch (err) {
      setError('Ошибка при загрузке списков ресторанов: ' + getErrorMessage(err));
      console.error('Error fetching restaurants lists:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortLists = (field: keyof IRestaurantsList) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteList = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот список ресторанов?')) return;
    try {
      setError(null);
      await restaurantsListService.delete(id);
      await fetchRestaurantsLists();
    } catch (err) {
      setError('Ошибка удаления списка: ' + getErrorMessage(err));
      console.error('Error deleting list:', err);
    }
  };

  const handleCreateListClick = () => {
    setIsCreatingList(true);
    setNewList({ name: '', description: '' });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNewListChange = (field: keyof IRestaurantsList, value: string) => {
    setNewList((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewList = async () => {
    if (!newList.name) {
      setError('Заполните название списка');
      return;
    }
    try {
      setError(null);
      await restaurantsListService.create(newList);
      setIsCreatingList(false);
      setNewList({ name: '', description: '' });
      await fetchRestaurantsLists();
    } catch (err) {
      setError(`Ошибка при создании списка ${getErrorMessage(err)}`);
      console.error('Error creating list:', err);
    }
  };

  const handleCopyList = async (id: string) => {
    try {
      setError(null);
      await restaurantsListService.copy(id);
    } catch (err) {
      setError(`Ошибка при копирвании списка ${getErrorMessage(err)}`);
      console.error('Error copy list:', err);
    }
  };

  const handleCancelNewList = () => {
    setIsCreatingList(false);
    setError(null);
    setNewList({ name: '', description: '' });
  };

  const handleNavigateToListPage = (id: string) => {
    navigate(`/restaurants/${id}`);
  };

  return {
    restaurantsLists: sortedRestaurantsLists,
    currentManager,
    isCreatingList,
    newList,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortLists,
    handleDeleteList,
    handleCreateListClick,
    handleNewListChange,
    handleSaveNewList,
    handleCancelNewList,
    handleNavigateToListPage,
    fetchRestaurantsLists,
    handleCopyList,
  };
};
