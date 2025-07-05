import { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAdminName = (state: RootState) => state.auth.user?.name;

export const selectCountries = (state: RootState) => state.countries.data;

export const selectTravelProgram = (state: RootState) => state.travelProgram.program;

export const selectMapData = (state: RootState) => state.travelProgram.program?.thirdPageMap;

export const selectHotels = (state: RootState) => state.hotelsData.hotels;
export const selectHotelsList = (state: RootState) => state.hotelsData.hotelsList;
export const selectHotelsListFull = (state: RootState) => state.hotelsData.hotelsListFull || [];

export const selectRestaurants = (state: RootState) => state.restaurantsData.restaurants;
export const selectRestaurantsList = (state: RootState) => state.restaurantsData.restaurantsList;
export const selectFullDataListRestaurants = (state: RootState) =>
  state.restaurantsData.restaurantsListFull || [];
