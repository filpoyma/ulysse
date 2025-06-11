import HotelApi from '../api/hotel.api';
import { store } from '../store';
import { hotelActions } from '../store/reducers/hotel';
import { IHotel } from '../types/hotel.types.ts';

export const hotelService = {
  async getAll() {
    const response = await HotelApi.getAll();
    store.dispatch(hotelActions.setHotels(response.data || []));
  },
  async getById(id: string) {
    return HotelApi.getById(id);
    //store.dispatch(hotelActions.setHotel(response.data || []));
  },
  async create(data: Omit<IHotel, '_id' | 'createdAt' | 'updatedAt'>) {
    return HotelApi.create(data);
  },
  async update(id: string, data: Partial<IHotel>) {
    const res = await HotelApi.update(id, data);
    store.dispatch(hotelActions.updateHotel(res.data));
  },
  async delete(id: string) {
    await HotelApi.delete(id);
    store.dispatch(hotelActions.removeHotel(id));
  },
};
