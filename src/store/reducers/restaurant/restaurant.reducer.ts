import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRestaurant } from '../../../types/restaurant.types';

interface RestaurantState {
  restaurants: IRestaurant[];
  restaurant: IRestaurant | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  restaurant: null,
};

const { reducer: restaurantReducer, actions: restaurantActions } = createSlice({
  name: 'restaurantsData',
  initialState,
  reducers: {
    setRestaurants(state, action: PayloadAction<IRestaurant[]>) {
      state.restaurants = action.payload;
    },
    setRestaurant(state, action: PayloadAction<IRestaurant | null>) {
      state.restaurant = action.payload;
    },
    updateRestaurant(state, action: PayloadAction<IRestaurant>) {
      state.restaurants = state.restaurants.map((rest) =>
        rest._id === action.payload._id ? action.payload : rest,
      );
      if (state.restaurant && state.restaurant._id === action.payload._id) {
        state.restaurant = action.payload;
      }
    },
    addRestaurant(state, action: PayloadAction<IRestaurant>) {
      state.restaurants.unshift(action.payload);
    },
    removeRestaurant(state, action: PayloadAction<string>) {
      state.restaurants = state.restaurants.filter((r) => r._id !== action.payload);
      if (state.restaurant && state.restaurant._id === action.payload) state.restaurant = null;
    },
  },
});

export { restaurantReducer, restaurantActions };
