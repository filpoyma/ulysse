import { useCallback, useState, useRef } from "react";
import { restaurantService } from "../../../services/restaurant.service";
import { RestaurantApiModel } from "../../../api/restaurant.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const useRestarauntsCollect = () => {
  const restaraunts = useSelector(
    (store: RootState) => store.restaurantsData.restaurants
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRestaraunt, setNewRestaraunt] = useState<
    Partial<RestaurantApiModel>
  >({});
  const [editingRestarauntId, setEditingRestarauntId] = useState<string | null>(
    null
  );
  const [editingRestarauntData, setEditingRestarauntData] = useState<
    Partial<RestaurantApiModel>
  >({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  const fetchRestaraunts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await restaurantService.getAll();
    } catch (e: unknown) {
      setError(
        (e as any)?.response?.data?.message || "Ошибка загрузки ресторанов"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateRestarauntClick = () => {
    setIsCreating(true);
    setNewRestaraunt({
      name: "",
      country: "",
      city: "",
      region: "",
      manager: "",
      stars: 1,
    });
    setError(null);
  };

  const handleNewRestarauntChange = (
    field: keyof RestaurantApiModel,
    value: string | number
  ) => {
    setNewRestaraunt((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewRestaraunt = async () => {
    try {
      setLoading(true);
      await restaurantService.create(
        newRestaraunt as Omit<
          RestaurantApiModel,
          "_id" | "createdAt" | "updatedAt"
        >
      );
      setIsCreating(false);
      setNewRestaraunt({});
      setError(null);
    } catch (e: unknown) {
      setError(
        (e as any)?.response?.data?.message || "Ошибка создания ресторана"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelNewRestaraunt = () => {
    setIsCreating(false);
    setNewRestaraunt({});
  };

  const handleRestarauntClick = (id: string) => {
    setEditingRestarauntId(id);
    const rest = restaraunts.find((r) => r._id === id);
    setEditingRestarauntData(rest ? { ...rest } : {});
    setError(null);
  };

  const handleEditRestarauntChange = (
    field: keyof RestaurantApiModel,
    value: string | number
  ) => {
    setEditingRestarauntData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEditRestaraunt = async () => {
    if (!editingRestarauntId) return;
    try {
      setLoading(true);
      await restaurantService.update(
        editingRestarauntId,
        editingRestarauntData
      );
      setEditingRestarauntId(null);
      setEditingRestarauntData({});
      setError(null);
    } catch (e: unknown) {
      setError(
        (e as any)?.response?.data?.message || "Ошибка обновления ресторана"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEditRestaraunt = () => {
    setEditingRestarauntId(null);
    setEditingRestarauntData({});
  };

  const handleDeleteRestaraunt = async (id: string) => {
    try {
      setLoading(true);
      await restaurantService.delete(id);
      setError(null);
    } catch (e: unknown) {
      setError(
        (e as any)?.response?.data?.message || "Ошибка удаления ресторана"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    restaraunts,
    loading,
    error,
    isCreating,
    newRestaraunt,
    editingRestarauntId,
    editingRestarauntData,
    nameInputRef,
    fetchRestaraunts,
    handleCreateRestarauntClick,
    handleNewRestarauntChange,
    handleSaveNewRestaraunt,
    handleCancelNewRestaraunt,
    handleRestarauntClick,
    handleEditRestarauntChange,
    handleSaveEditRestaraunt,
    handleCancelEditRestaraunt,
    handleDeleteRestaraunt,
  };
};
