import hotelsListApi from '../api/hotelsList.api.ts';
import {
  ICreateHotelsListData,
  IHotelsList,
  IHotelsListStats,
  IUpdateHotelsListData,
} from '../types/hotelsList.types.ts';
import { store } from '../store';
import { hotelActions } from '../store/reducers/hotel';

export const hotelsListService = {
  getAll(params?: { active?: boolean; withHotels?: boolean }) {
    return hotelsListApi.getAll(params);
  },

  // Получить список отелей по ID
  getById(id: string) {
    return hotelsListApi.getById(id);
  },

  async getFullById(id: string) {
    const res = await hotelsListApi.getFullById(id);
    store.dispatch(hotelActions.setHotels(res.data.hotels));
  },

  // Создать новый список отелей
  create(data: ICreateHotelsListData) {
    return hotelsListApi.create(data);
  },

  // Обновить список отелей
  update(id: string, data: IUpdateHotelsListData): Promise<{ data: IHotelsList }> {
    return hotelsListApi.update(id, data);
  },

  // Удалить список отелей
  delete(id: string) {
    return hotelsListApi.delete(id);
  },

  // Добавить отель в список
  addHotel(listId: string, hotelId: string) {
    return hotelsListApi.addHotel(listId, hotelId);
  },

  // Удалить отель из списка
  removeHotel(listId: string, hotelId: string) {
    return hotelsListApi.removeHotel(listId, hotelId);
  },

  // Получить статистику списков отелей
  getStats(): Promise<{ data: IHotelsListStats }> {
    return hotelsListApi.getStats();
  },
};
