import { createSelector } from '@reduxjs/toolkit';
import {
  selectFullDataListHotels,
  selectFullDataListRestaurants,
  selectMapData,
  selectTravelProgram,
} from './selectors.ts';
import { getImagePath } from '../utils/helpers.ts';

export const selectTravelProgramGallery = createSelector(
  [selectTravelProgram],
  (travelProgram) =>
    travelProgram?.fourthPageDay?.gallery?.map((image) => ({
      original: getImagePath(image.path),
    })) || [],
);

export const selectTravelProgramDaySection = createSelector(
  [selectTravelProgram],
  (travelProgram) => travelProgram?.fourthPageDay?.daysData || [],
);

export const selectTravelProgramImages = createSelector(
  [selectTravelProgram],
  (travelProgram) => travelProgram?.fourthPageDay?.gallery || [],
);

export const selectLogisticsData = createSelector(
  [selectMapData],
  (mapData) => mapData?.logistics || [],
);

export const selectRestaurantsNames = createSelector(
  [selectFullDataListRestaurants],
  (restaurants) =>
    restaurants.map((restaurant) => ({
      name: restaurant.name,
      id: restaurant._id,
    })),
);

export const selectHotelsNames = createSelector([selectFullDataListHotels], (hotels) =>
  hotels.map((hotel) => ({
    name: hotel.name,
    id: hotel._id,
  })),
);
