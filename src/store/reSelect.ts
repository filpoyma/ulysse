import { createSelector } from '@reduxjs/toolkit';
import { ROOT_URL } from '../constants/api.constants.ts';
import { selectMapData, selectTravelProgram } from './selectors.ts';

export const selectTravelProgramGallery = createSelector(
  [selectTravelProgram],
  travelProgram =>
    travelProgram?.fourthPageDay?.gallery?.map(image => ({
      original: `${ROOT_URL}/${image.path?.replace(/^\//, '')}`,
    })) || [],
);

export const selectTravelProgramDaySection = createSelector(
  [selectTravelProgram],
  travelProgram => travelProgram?.fourthPageDay?.daysData || [],
);

export const selectTravelProgramImages = createSelector(
  [selectTravelProgram],
  travelProgram => travelProgram?.fourthPageDay?.gallery || [],
);

export const selectLogisticsData = createSelector(
  [selectMapData],
  mapData => mapData?.logistics || [],
);
