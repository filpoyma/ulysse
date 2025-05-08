import RestaurantApi, { RestaurantApiModel } from "../api/restaurant.api";
// import { store } from "../store";
// import { restaurantActions } from "../store/reducers/restaurant";

export const restaurantService = {
  async getAll() {
    return RestaurantApi.getAll();
  },
  async getById(id: string) {
    return RestaurantApi.getById(id);
  },
  async create(data: Omit<RestaurantApiModel, "_id" | "createdAt" | "updatedAt">) {
    return RestaurantApi.create(data);
  },
  async update(id: string, data: Partial<RestaurantApiModel>) {
    const res = await RestaurantApi.update(id, data);
    // store.dispatch(restaurantActions.updateRestaurant(res.data));
    return res;
  },
  async delete(id: string) {
    await RestaurantApi.delete(id);
    // store.dispatch(restaurantActions.removeRestaurant(id));
  },
}; 