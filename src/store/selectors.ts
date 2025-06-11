import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectCountries = (state: RootState) => state.countries.data;

export const selectTravelProgram = (state: RootState) => state.travelProgram.program;
export const selectMapData = (state: RootState) => state.travelProgram.program?.thirdPageMap;

export const selectLogisticsData = createSelector(
  [selectMapData],
  mapData => mapData?.logistics || [],
);

export const selectHotels = (state: RootState) => state.hotel.hotels;