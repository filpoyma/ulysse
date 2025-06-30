import { createSelector } from '@reduxjs/toolkit';
import { selectMapData, selectTravelProgram } from './selectors.ts';
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
