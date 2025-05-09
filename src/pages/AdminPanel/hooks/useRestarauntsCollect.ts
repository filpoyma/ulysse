import { useCallback, useState, useRef, useMemo } from "react";
import { restaurantService } from "../../../services/restaurant.service";
import { RestaurantApiModel } from "../../../api/restaurant.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const emptyRestaurant: Omit<RestaurantApiModel, "_id" | "createdAt" | "updatedAt"> = {
  name: "",
  country: "",
  city: "",
  region: "",
  manager: "",
  stars: 1,
};

export const useRestarauntsCollect = () => {
  const restaraunts = useSelector((state: RootState) => state.restaurantsData.restaurants);
  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingRestaraunt, setIsCreatingRestaraunt] = useState(false);
  const [newRestaraunt, setNewRestaraunt] = useState<typeof emptyRestaurant>(emptyRestaurant);
  const [editingRestarauntId, setEditingRestarauntId] = useState<string | null>(null);
  const [editingRestarauntData, setEditingRestarauntData] = useState<typeof emptyRestaurant>(emptyRestaurant);
  const [sortField, setSortField] = useState<keyof RestaurantApiModel>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const sortedRestaraunts = useMemo(() => {
    const arr = [...restaraunts];
    arr.sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [restaraunts, sortField, sortOrder]);

  const handleSortRestaraunts = (field: keyof RestaurantApiModel) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const fetchRestaraunts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await restaurantService.getAll();
    } catch (e: unknown) {
      const error = e as ApiError;
      setError(error.response?.data?.message || "Ошибка загрузки ресторанов");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateRestarauntClick = () => {
    setIsCreatingRestaraunt(true);
    setNewRestaraunt({
      ...emptyRestaurant,
      manager: userName || "",
    });
    setError(null);
  };

  const handleNewRestarauntChange = (
    field: keyof RestaurantApiModel,
    value: string | number
  ) => {
    if (field === "manager") return;
    setNewRestaraunt((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewRestaraunt = async () => {
    try {
      setLoading(true);
      await restaurantService.create(newRestaraunt);
      setIsCreatingRestaraunt(false);
      setNewRestaraunt(emptyRestaurant);
      setError(null);
    } catch (e: unknown) {
      const error = e as ApiError;
      setError(error.response?.data?.message || "Ошибка создания ресторана");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelNewRestaraunt = () => {
    setIsCreatingRestaraunt(false);
    setNewRestaraunt(emptyRestaurant);
  };

  const handleRestarauntClick = (id: string) => {
    setEditingRestarauntId(id);
    const rest = restaraunts.find((r: RestaurantApiModel) => r._id === id);
    setEditingRestarauntData(rest ? { ...rest } : emptyRestaurant);
    setError(null);
  };

  const handleEditRestarauntChange = (
    field: keyof RestaurantApiModel,
    value: string | number
  ) => {
    if (field === "manager") return;
    setEditingRestarauntData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEditRestaraunt = async () => {
    if (!editingRestarauntId) return;
    try {
      setLoading(true);
      await restaurantService.update(editingRestarauntId, editingRestarauntData);
      setEditingRestarauntId(null);
      setEditingRestarauntData(emptyRestaurant);
      setError(null);
    } catch (e: unknown) {
      const error = e as ApiError;
      setError(error.response?.data?.message || "Ошибка обновления ресторана");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEditRestaraunt = () => {
    setEditingRestarauntId(null);
    setEditingRestarauntData(emptyRestaurant);
  };

  const handleDeleteRestaraunt = async (id: string) => {
    try {
      setLoading(true);
      await restaurantService.delete(id);
      setError(null);
    } catch (e: unknown) {
      const error = e as ApiError;
      setError(error.response?.data?.message || "Ошибка удаления ресторана");
    } finally {
      setLoading(false);
    }
  };

  return {
    restaraunts: sortedRestaraunts,
    isCreatingRestaraunt,
    newRestaraunt,
    editingRestarauntId,
    editingRestarauntData,
    sortField,
    sortOrder,
    error,
    loading,
    nameInputRef,
    handleSortRestaraunts,
    handleRestarauntClick,
    handleEditRestarauntChange,
    handleSaveEditRestaraunt,
    handleCancelEditRestaraunt,
    handleDeleteRestaraunt,
    handleCreateRestarauntClick,
    handleNewRestarauntChange,
    handleSaveNewRestaraunt,
    handleCancelNewRestaraunt,
    fetchRestaraunts,
  };
};
