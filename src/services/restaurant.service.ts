import RestaurantApi, { RestaurantApiModel } from "../api/restaurant.api";
import { restaurantActions } from "../store/reducers/restaurant";
import { store } from "../store";
// import { store } from "../store";
// import { restaurantActions } from "../store/reducers/restaurant";

export const restaurantService = {
  async getAll() {
    const { data } = await RestaurantApi.getAll();
    store.dispatch(restaurantActions.setRestaurants(data));
  },
  async getById(id: string) {
    return RestaurantApi.getById(id);
  },
  async create(
    data: Omit<RestaurantApiModel, "_id" | "createdAt" | "updatedAt">
  ) {
    const res = await RestaurantApi.create(data);
    store.dispatch(restaurantActions.addRestaurant(res.data));
  },
  async update(id: string, data: Partial<RestaurantApiModel>) {
    const res = await RestaurantApi.update(id, data);
    store.dispatch(restaurantActions.updateRestaurant(res.data));
  },
  async delete(id: string) {
    await RestaurantApi.delete(id);
    store.dispatch(restaurantActions.removeRestaurant(id));
  },
};
