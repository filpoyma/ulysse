import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hotelService } from '../../../services/hotel.service';
import { hotelActions } from '../../../store/reducers/hotel';
import { IHotel, IHotelCreate } from '../../../types/hotel.types.ts';
import { selectHotels } from '../../../store/selectors.ts';
import { useNavigate } from 'react-router-dom';

export const useHotelsCollect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotels = useSelector(selectHotels);
  const [isCreatingHotel, setIsCreatingHotel] = useState(false);
  const [newHotel, setNewHotel] = useState<IHotelCreate>({
    name: '',
    country: '',
    address: '',
    region: '',
  });
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [editingHotelData, setEditingHotelData] = useState<IHotelCreate>({
    name: '',
    country: '',
    address: '',
    region: '',
  });
  const [sortField, setSortField] = useState<keyof IHotel>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const sortedHotels = useMemo(() => {
    const arr = [...hotels];
    arr.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [hotels, sortField, sortOrder]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      await hotelService.getAll();
    } catch (err) {
      setError('Ошибка при загрузке отелей');
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortHotels = (field: keyof IHotel) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleHotelClick = (id: string) => {
    const hotel = hotels.find((h: IHotel) => h._id === id);
    if (!hotel) return;
    setEditingHotelId(id);
    setEditingHotelData({
      name: hotel.name,
      country: hotel.country,
      address: hotel.address,
      region: hotel.region,
    });
    //setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleEditHotelChange = (field: keyof IHotel, value: string) => {
    setEditingHotelData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEditHotel = async () => {
    if (!editingHotelId) return;
    if (
      !editingHotelData.name ||
      !editingHotelData.country ||
      !editingHotelData.address ||
      !editingHotelData.region
    ) {
      setError('Заполните все поля');
      return;
    }
    try {
      setError(null);
      await hotelService.update(editingHotelId, editingHotelData);
      setEditingHotelId(null);
      setEditingHotelData({ name: '', country: '', address: '', region: '' });
    } catch (err) {
      setError('Ошибка при редактировании отеля');
      console.error('Error editing hotel:', err);
    }
  };

  const handleCancelEditHotel = () => {
    setEditingHotelId(null);
    setEditingHotelData({ name: '', country: '', address: '', region: '' });
  };

  const handleDeleteHotel = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот отель?')) return;
    try {
      setError(null);
      await hotelService.delete(id);
    } catch (err) {
      setError('Ошибка удаления отеля');
      console.error('Error deleting hotel:', err);
    }
  };

  const handleCreateHotelClick = () => {
    setIsCreatingHotel(true);
    setNewHotel({ name: '', country: '', address: '', region: '' });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNewHotelChange = (field: keyof IHotel, value: string) => {
    setNewHotel((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewHotel = async () => {
    if (!newHotel.name || !newHotel.country || !newHotel.address || !newHotel.region) {
      setError('Заполните все поля');
      return;
    }
    try {
      setError(null);
      const res = await hotelService.create({
        name: newHotel.name,
        country: newHotel.country,
        address: newHotel.address,
        region: newHotel.region,
      });
      dispatch(hotelActions.addHotel(res.data));
      setIsCreatingHotel(false);
      setNewHotel({ name: '', country: '', address: '', region: '' });
    } catch (err) {
      setError(`Ошибка при создании отеля ${JSON.stringify(err?.message)}`);
      console.error('Error creating hotel:', err?.message);
    }
  };

  const handleCancelNewHotel = () => {
    setIsCreatingHotel(false);
    setError(null);
    setNewHotel({ name: '', country: '', address: '', region: '' });
  };

  const handleNavigateToHotelPage = (id: string) => {
    navigate(`/hotel/${id}`);
  };

  return {
    hotels: sortedHotels,
    isCreatingHotel,
    newHotel,
    editingHotelId,
    editingHotelData,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortHotels,
    handleHotelClick,
    handleEditHotelChange,
    handleSaveEditHotel,
    handleCancelEditHotel,
    handleDeleteHotel,
    handleCreateHotelClick,
    handleNewHotelChange,
    handleSaveNewHotel,
    handleCancelNewHotel,
    handleNavigateToHotelPage,
    fetchHotels,
  };
};
