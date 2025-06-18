import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ROOT_URL } from '../constants/api.constants.ts';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectCountries = (state: RootState) => state.countries.data;

export const selectTravelProgram = (state: RootState) => state.travelProgram.program;

export const selectTravelProgramGallery = createSelector(
  [selectTravelProgram],
  travelProgram =>
    travelProgram?.fourthPageDay?.gallery?.map(image => ({
      original: `${ROOT_URL}/${image.path?.replace(/^\//, '')}`,
    })) || [],
);

export const selectTravelProgramDaySection = (state: RootState) =>
  state.travelProgram.program?.fourthPageDay.daysData || [];

export const selectTravelProgramImages = createSelector(
  [selectTravelProgram],
  travelProgram => travelProgram?.fourthPageDay?.gallery || [],
);

export const selectMapData = (state: RootState) => state.travelProgram.program?.thirdPageMap;

export const selectLogisticsData = createSelector(
  [selectMapData],
  mapData => mapData?.logistics || [],
);

export const selectHotels = (state: RootState) => state.hotel.hotels;
