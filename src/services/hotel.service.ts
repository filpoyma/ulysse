import HotelApi, { HotelApiModel } from "../api/hotel.api";
import { store } from "../store";
import { hotelActions } from "../store/reducers/hotel";

export const hotelService = {
  async getAll() {
    return HotelApi.getAll();
  },
  async getById(id: string) {
    return HotelApi.getById(id);
  },
  async create(data: Omit<HotelApiModel, "_id" | "createdAt" | "updatedAt">) {
    return HotelApi.create(data);
  },
  async update(id: string, data: Partial<HotelApiModel>) {
    const res = await HotelApi.update(id, data);
    store.dispatch(hotelActions.updateHotel(res.data));
  },
  async delete(id: string) {
    await HotelApi.delete(id);
    store.dispatch(hotelActions.removeHotel(id));
  },
};
