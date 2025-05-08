import { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hotelService } from "../../../services/hotel.service";
import { HotelApiModel } from "../../../api/hotel.api";
import { hotelActions } from "../../../store/reducers/hotel";
import { RootState } from "../../../store";

export const useHotelsCollect = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [isCreatingHotel, setIsCreatingHotel] = useState(false);
  const [newHotel, setNewHotel] = useState<
    Omit<HotelApiModel, "_id" | "createdAt" | "updatedAt">
  >({
    name: "",
    country: "",
    type: "",
    region: "",
  });
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
  const [editingHotelData, setEditingHotelData] = useState<
    Omit<HotelApiModel, "_id" | "createdAt" | "updatedAt">
  >({
    name: "",
    country: "",
    type: "",
    region: "",
  });
  const [sortField, setSortField] = useState<keyof HotelApiModel>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const sortedHotels = useMemo(() => {
    const arr = [...hotels];
    arr.sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [hotels, sortField, sortOrder]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await hotelService.getAll()) as {
        data: HotelApiModel[];
      };
      dispatch(hotelActions.setHotels(response.data || []));
    } catch (err) {
      setError("Ошибка при загрузке отелей");
      console.error("Error fetching hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortHotels = (field: keyof HotelApiModel) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleHotelClick = (id: string) => {
    const hotel = hotels.find((h: HotelApiModel) => h._id === id);
    if (!hotel) return;
    setEditingHotelId(id);
    setEditingHotelData({
      name: hotel.name,
      country: hotel.country,
      type: hotel.type,
      region: hotel.region,
    });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleEditHotelChange = (field: keyof HotelApiModel, value: string) => {
    setEditingHotelData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEditHotel = async () => {
    if (!editingHotelId) return;
    if (
      !editingHotelData.name ||
      !editingHotelData.country ||
      !editingHotelData.type ||
      !editingHotelData.region
    ) {
      setError("Заполните все поля");
      return;
    }
    try {
      setError(null);
      await hotelService.update(editingHotelId, editingHotelData);
      setEditingHotelId(null);
      setEditingHotelData({ name: "", country: "", type: "", region: "" });
    } catch (err) {
      setError("Ошибка при редактировании отеля");
      console.error("Error editing hotel:", err);
    }
  };

  const handleCancelEditHotel = () => {
    setEditingHotelId(null);
    setEditingHotelData({ name: "", country: "", type: "", region: "" });
  };

  const handleDeleteHotel = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот отель?")) return;
    try {
      setError(null);
      await hotelService.delete(id);
    } catch (err) {
      setError("Ошибка удаления отеля");
      console.error("Error deleting hotel:", err);
    }
  };

  const handleCreateHotelClick = () => {
    setIsCreatingHotel(true);
    setNewHotel({ name: "", country: "", type: "", region: "" });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNewHotelChange = (field: keyof HotelApiModel, value: string) => {
    setNewHotel((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewHotel = async () => {
    if (
      !newHotel.name ||
      !newHotel.country ||
      !newHotel.type ||
      !newHotel.region
    ) {
      setError("Заполните все поля");
      return;
    }
    try {
      setError(null);
      const res = await hotelService.create({
        name: newHotel.name,
        country: newHotel.country,
        type: newHotel.type,
        region: newHotel.region,
      });
      dispatch(hotelActions.addHotel(res.data));
      setIsCreatingHotel(false);
      setNewHotel({ name: "", country: "", type: "", region: "" });
    } catch (err) {
      setError("Ошибка при создании отеля");
      console.error("Error creating hotel:", err);
    }
  };

  const handleCancelNewHotel = () => {
    setIsCreatingHotel(false);
    setNewHotel({ name: "", country: "", type: "", region: "" });
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
    fetchHotels,
  };
};
